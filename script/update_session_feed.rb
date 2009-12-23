require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'digest'

def main

  data_dir = File.join(File.dirname(File.dirname(__FILE__)), "data")

  session_feed = 'http://www.codemash.org/rest/sessions.xml'

  doc = Nokogiri(open(session_feed).read)

  (doc/'Session').each do |node|
    session = Session.new(node)
    session.to_html
  end

  puts "Win condition acquired."
end


class Session

  def initialize node
    @node = node
  end

  def uri
    (@node/'URI').inner_html
  end

  def title
    (@node/'Title').inner_html
  end

  def abstract
    (@node/'Abstract').inner_html
  end

  def start
    (@node/'Start').inner_html
  end

  def room
    (@node/'Room').inner_html
  end

  def difficulty
    (@node/'Difficulty').inner_html
  end

  def speaker_name
    (@node/'SpeakerName').inner_html
  end

  def technology
    (@node/'Technology').inner_html
  end

  def track
    (@node/'Track').inner_html
  end

  def id
    [Digest::SHA1.hexdigest(uri)].pack("*m")[0..8]
  end


  def to_html
    <<-EOHTML
<div id="session_#{id}" class='session'>
<div class='content'>
<h1 class='title'>#{title}</h1>
<div class='speakerName'>#{speaker_name}</div>
<div class='room'>#{room}</div>
<div class='start'>#{start}</div>
<div class='difficulty'>#{difficulty}</div>
<div class='technology'>#{technology}</div>
<div class='track'>#{track}</div>
<div class='description'>#{abstract}</div>
</div>
</div>
EOHTML
  end

end


main
