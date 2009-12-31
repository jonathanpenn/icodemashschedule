require 'erb'


class AppTemplate

  def self.render
    self.new.to_html
  end

  def initialize
    @template = ERB.new(template_data, 0, '')
  end

  def to_html
    @template.result(binding)
  end

  def template_data
    @template_data ||= File.read(File.dirname(__FILE__) + "/webroot/app.html.erb")
  end

  def build_version
    APP_VERSION
  end

end
