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


File.open(File.join(webroot_dir, "codemash.html"), "w") do |f|

  $event_i = 1

  ical.first.events.each do |event|

    id = "pid#{$event_i}"
    $event_i += 1

    result = <<-EOHTML
      <div id="#{id}" class='_presentation'>
        <div class="toolbar">
          <h1>Presentation</h1>
          <a class="back" href="#">Back</a>
        </div>

        <ul class="rounded">
          <li class='_title'>#{event.summary}</li>
          <li class='_location'>#{event.location}</li>
          <li class='_startTime'>#{event.dtstart}</li>
          <li class='_endTime'>#{event.dtend}</li>
        </ul>

        <div class='description'>
          #{to_html(event.description)}
        </div>
      </div>
    EOHTML
    f.puts result

  end


end
