require 'rubygems'
require 'vpim'
require 'bluecloth'

ical_data = File.read("tmp/codemash.ics")

ical = Vpim::Icalendar.decode(ical_data)
puts ical.first.events.first.inspect

def to_html(text)
  BlueCloth.new(text).to_html
end

ical.first.events.each do |event|

  result = <<-EOHTML
    <div room='#{event.location}' startTime='#{event.dtstart}' endTime='#{event.dtend}'>
      <h2>#{to_html(event.summary)}</h2>
      <div class='description'>
        #{to_html(event.description)}
      </div>
    </div>
  EOHTML

  puts result
end
