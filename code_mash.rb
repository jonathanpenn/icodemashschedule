require 'templates/app_template'


class CodeMash

  def initialize app, options={}
    @app = app
  end

  def call(env)
    case env['PATH_INFO']
    when '/cache.manifest'
      if HTML5_CACHING
        render_cache_manifest
      else
        render_not_found
      end
    when /\/(index|app)\.html/
      [200, {}, AppTemplate.render($1)]
    when '/test'
      redirect_to '/test.html'
    when '/'
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

  def render_not_found
    [404, {}, '']
  end

  def render_cache_manifest
    [200, {'Content-Type' => 'text/cache-manifest'}, manifest]
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
