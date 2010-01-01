require 'erb'


class AppTemplate

  def self.render(file)
    self.new(file).to_html
  end

  def initialize file
    @file = file
    @template = ERB.new(template_data, 0, '')
  end

  def to_html
    @template.result(binding)
  end

  def template_data
    @template_data ||= File.read(File.dirname(__FILE__) +
                                 "/webroot/%s.html.erb" % [@file])
  end

  def build_version
    APP_VERSION
  end

  def about_content
    @about_content ||= File.read(File.dirname(__FILE__) +
                                 "/webroot/nocache/_about_content.html")
  end

end
