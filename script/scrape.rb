require 'rubygems'
require 'nokogiri'
require 'open-uri'

repo_dir = File.dirname(File.dirname(__FILE__))

calendar_feed = 'http://www.google.com/calendar/ical/h6s2ai0gdmaomi2pmlqkjiq4e0%40group.calendar.google.com/public/basic.ics'

xml = open(calendar_feed).read

FileUtils.mkdir_p(File.join(repo_dir, "tmp"))
File.open(File.join(repo_dir, "tmp", "codemash.ics"), "w") do |f|
  f.write xml
end

puts "Win condition acquired."
