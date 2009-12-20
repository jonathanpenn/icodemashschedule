require 'index_template'


class CacheManifesto

  def initialize app, options={}
    @app = app
  end

  def call(env)
    if env['PATH_INFO'] == '/cache.manifest'
      [200, {'Content-Type' => 'text/cache-manifest'}, manifest]
      # [404, {}, '']
    elsif env['PATH_INFO'] == '/index.html'
      [200, {}, IndexTemplate.render]
    elsif env['PATH_INFO'] == '/test'
      redirect_to '/test.html'
    elsif env['PATH_INFO'] == '/'
      redirect_to '/index.html'
    else
      @app.call(env)
    end
  end

  def redirect_to url
    text = <<-EOS
      Redirecting to #{url}
    EOS
    [301, {'Location' => url}, text]
  end

  def manifest
    <<EOM
CACHE MANIFEST
# Version #{APP_VERSION}

#{file_list}
EOM
  end

  def file_list
    path = File.expand_path(File.dirname(__FILE__))
    files = Dir[path+"/webroot/**/*"].reject do |file|
      File.directory?(file) || file =~ /\/test/ || file =~ /codemash\.html/ || file =~ /\.erb$/
    end.map do |file|
      file.gsub(path+"/webroot/",'')
    end
    files.join("\n")
  end

end
