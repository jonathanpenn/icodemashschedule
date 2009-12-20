require 'erb'


class IndexTemplate

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
    @template_data ||= File.read(File.dirname(__FILE__) + "/webroot/index.html.erb")
  end

  def schedule
    @schedule ||= File.read(File.dirname(__FILE__) + "/webroot/codemash.html")
  end
end
