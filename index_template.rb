require 'mustache'


class IndexTemplate < Mustache
  self.template_file = File.dirname(__FILE__) + "/webroot/index.html.template"

  def schedule
    File.read(File.dirname(__FILE__) + "/webroot/codemash.html")
  end
end
