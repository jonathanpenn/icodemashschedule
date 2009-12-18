require 'rubygems'
require 'vpim'
require 'bluecloth'

data_dir = File.join(File.dirname(File.dirname(__FILE__)), "data")
webroot_dir = File.join(File.dirname(data_dir), "webroot")
ical_data = File.read(File.join(data_dir, "codemash.ics"))

ical = Vpim::Icalendar.decode(ical_data)

def to_html(text)
  BlueCloth.new(text).to_html
end

def js_escape(text)
  text.gsub("\n", '\n').gsub("\"", '\"')
end

def full_escape(text)
  js_escape(to_html(text))
end

$KCODE='u'

def utf8_escape(str)
  s = ""
  str.each_char do |c|
    x = c.unpack("C")[0]
    if x < 128
      s << c
    else
      s << "\\u%04x" % c.unpack("U")[0]
    end
  end
  s
end


File.open(File.join(webroot_dir, "js/codemash.js"), "w") do |f|

  f.puts "var presentations = [];"

  ical.first.events.each do |event|

    f.puts "p = {};"
    f.puts "p.title = \"#{full_escape(event.summary)}\";"
    f.puts "p.startTime = new Date(Date.parse(\"#{event.dtstart}\"));"
    f.puts "p.endTime = new Date(Date.parse(\"#{event.dtend}\"));"
    f.puts "p.location = \"#{full_escape(event.location)}\";"

    f.puts "p.description = \"#{full_escape(utf8_escape(event.description))}\";"
    f.puts "presentations.push(p);"
    f.puts

  end


end
