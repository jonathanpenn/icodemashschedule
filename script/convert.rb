require 'rubygems'
require 'vpim'
require 'bluecloth'

data_dir = File.join(File.dirname(File.dirname(__FILE__)), "data")
ical_data = File.read(File.join(data_dir, "codemash.ics"))

ical = Vpim::Icalendar.decode(ical_data)

def to_html(text)
  BlueCloth.new(text).to_html
end

File.open(File.join(data_dir, "codemash.html"), "w") do |f|

  ical.first.events.each do |event|

    result = <<-EOHTML
      <div room='#{event.location}' startTime='#{event.dtstart}' endTime='#{event.dtend}'>
        <h2>#{to_html(event.summary)}</h2>
        <div class='description'>
          #{to_html(event.description)}
        </div>
      </div>
    EOHTML

    f.puts result
  end

end
