class CacheManifest

  def initialize production
    @production = production
  end

  def call env
    [200, {"Content-Type" => "text/cache-manifest"}, [body]]
  end

  def body
    return @body if @body && Rails.env.production?

    @body = <<EOS
CACHE MANIFEST
# v#{cache_version}

#{cache_files.join("\n")}

NETWORK:
*

EOS
  end

  def cache_files
    @cache_files ||= if production?
      production_cache_files
    else
      development_cache_files
    end
  end

  def production_cache_files
    (development_cache_files.reject do |file|
      file[/\.(js|css)$/]
    end + ["/assets/application.js", "/assets/application.css"]).sort
  end

  def development_cache_files
    asset_directories.map do |dir|
      Dir[dir+"/**/*"].map do |file|
        if File.file?(file) && not_development?(file)
          file = remove_directory_prefix(file, dir)
          file = remove_any_development_extensions(file)
          prepend_assets_path(file)
        end
      end
    end.flatten.select{|v| v}.sort
  end

  def reject_directories(file)
    File.file?(file)
  end

  def remove_directory_prefix(file, dir)
    file.sub(dir, '')
  end

  def remove_any_development_extensions(file)
    file.gsub(/\.erb$/, '')
  end

  def prepend_assets_path(file)
    "/assets" + file
  end

  def not_development?(file)
    !file[/\.(scss)/]
  end

  def asset_directories
    @asset_directories ||= Rails.application.config.assets.paths
  end

  def production?; @production end

  def cache_version
    ENV['CACHE_VERSION'] || Time.now.to_f
  end

end
