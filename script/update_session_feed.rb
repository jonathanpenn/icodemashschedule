require 'rubygems'
require 'nokogiri'
require 'open-uri'

data_dir = File.join(File.dirname(File.dirname(__FILE__)), "data")

session_feed = 'http://www.codemash.org/rest/sessions.xml'

xml = open(calendar_feed).read

File.open(File.join(data_dir, "codemash.xml"), "w") do |f|
  f.write xml
end

puts "Win condition acquired."
