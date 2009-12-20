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


def toolbar_html
<<-EOS
<div class="toolbar">
    <h1>Presentation</h1>
    <a class="back" href="#">Back</a>
  </div>
EOS
end


File.open(File.join(webroot_dir, "codemash.html"), "w") do |f|

  $event_i = 1

  ical.first.events.each do |event|

    id = "pid#{$event_i}"
    $event_i += 1

    result = <<-EOHTML
<div id="#{id}" class='_presentation'>
  #{toolbar_html}
  <div class='meta'>
    <h1 class='title'>#{event.summary}</h1>
    <div class='location'>#{event.location}</div>
    <div class='startTime'>#{event.dtstart}</div>
    <div class='endTime'>#{event.dtend}</div>
  </div>

  <div class='description'>
    #{to_html(event.description)}
  </div>
</div>
EOHTML
    f.puts result

  end


end
