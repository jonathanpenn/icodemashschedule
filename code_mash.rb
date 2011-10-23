require_relative 'templates/app_template'


class CodeMash

  def initialize app, options={}
    @app = app
  end

  def call(env)
    case env['PATH_INFO']
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

end
