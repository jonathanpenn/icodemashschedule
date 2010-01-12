require File.join(File.dirname(__FILE__), '..', 'gems', 'environment')
require 'script/schedule'

OUTFILE = File.expand_path(File.join(File.dirname(__FILE__), '..', 'webroot', 'js', 'schedule.js'))

File.open(OUTFILE, "w") do |f|
  f.puts Schedule.new.to_javascript
end
