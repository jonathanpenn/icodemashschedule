class CacheManifest

  def initialize app
    @app = app
  end

  def call env
    if env['PATH_INFO'] == '/cache.manifest' && HTML5_CACHING
      [200, {'Content-Type' => 'text/cache-manifest'}, manifest]
    else
      @app.call env
    end
  end

  def manifest
    <<EOM
CACHE MANIFEST
# For version #{APP_VERSION}

#{file_list}
EOM
  end

  def file_list
    path = File.expand_path(File.dirname(__FILE__))
    files = Dir[path+"/webroot/**/*"].reject do |file|
      dont_include?(file)
    end.map do |file|
      file.gsub(path+"/webroot/",'')
    end
    files.join("\n")
  end

  def dont_include? file
    File.directory?(file) ||
      file =~ /\/test/ ||
      file =~ /qunit/ ||
      file =~ /nocache/
  end


end
