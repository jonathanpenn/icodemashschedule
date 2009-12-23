require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'digest'
require 'time'

def main

  data_dir = File.join(File.dirname(File.dirname(__FILE__)), "data")

  session_feed = 'http://www.codemash.org/rest/sessions.xml'

  doc = Nokogiri(open(session_feed).read)

  puts "(function() {"
  puts "var ses = [];"
  (doc/'Session').each do |node|
    session = Session.new(node)
    puts session.to_js
  end
  puts "window.sessions = ses;"
  puts "})();"
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
    "new Date("+(Time.parse((@node/'Start').inner_html).to_i.to_s)+"000)"
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


  def to_js
    %{ses.push(new Session({id:"session_#{j(id)}",title:"#{j(title)}",speaker:"#{j(speaker_name)}",start:#{(start)},room:"#{j(room)})",difficulty:"#{j(difficulty)}",technology:"#{j(technology)}",track:"#{j(track)}",description:"#{j(abstract)}"}));}
  end


  JS_ESCAPE_MAP = {
    '\\'    => '\\\\',
    '</'    => '<\/',
    "\r\n"  => '\n',
    "\n"    => '\n',
    "\r"    => '\n',
    '"'     => '\\"',
    "'"     => "\\'" }

  def j(javascript)
    if javascript
      javascript.gsub(/(\\|<\/|\r\n|[\n\r"'])/) { JS_ESCAPE_MAP[$1] }
    else
      ''
    end
  end

end


main
