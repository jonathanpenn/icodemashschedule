class CacheManifest

  def initialize environment
    @environment = environment
  end

  def call env
    [200, {"Content-Type" => "text/cache-manifest"}, [body]]
  end

  def body
    @body ||= build
  end

  def build
    <<EOS
CACHE MANIFEST
# v#{cache_version}

#{cache_files.join("\n")}

NETWORK:
*

EOS
  end

  def cache_files
    @cache_files ||= asset_directories.map do |dir|
      Dir[dir+"/**/*"].map do |file|
        if File.file?(file)
          "/assets" + file.sub(dir, '').gsub(/\.erb$/,'')
        end
      end
    end.flatten.compact.sort
  end

  def asset_directories
    @asset_directories ||= Rails.application.config.assets.paths
  end

  def production?; @environment == "production" end
  def development?; @environment == "development" end

  def cache_version
    ENV['CACHE_VERSION'] || Time.now.to_f
  end

end
