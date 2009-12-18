require 'rubygems'
require 'nokogiri'
require 'open-uri'

data_dir = File.join(File.dirname(File.dirname(__FILE__)), "data")

calendar_feed = 'http://www.google.com/calendar/ical/h6s2ai0gdmaomi2pmlqkjiq4e0%40group.calendar.google.com/public/basic.ics'

xml = open(calendar_feed).read

File.open(File.join(data_dir, "codemash.ics"), "w") do |f|
  f.write xml
end

puts "Win condition acquired."
