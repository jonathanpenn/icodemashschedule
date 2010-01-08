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
  puts "var s = [];"
  sessions = (doc/'Session').map {|node| scrub(Session.new(node)) }
  sessions.sort_by{|s| s.start.to_i.to_s + s.title}.each do |session|
    puts session.to_js
  end
  puts "window.sessions = s;"
  puts "})();"
end


def scrub session
  # A list of special cases to clean session ifo
  unescape_br_tags_in_abstract(session)
  unescape_html_quotes(session)
  session
end


class Session
  attr_accessor :title, :room, :abstract, :start, :uri
  attr_accessor :difficulty, :speaker_name, :technology, :track

  def initialize node
    @uri = (node/'URI').inner_html
    @title = (node/'Title').inner_html
    @abstract = (node/'Abstract').inner_html
    @start = Time.parse((node/'Start').inner_html).to_i
    @room = (node/'Room').inner_html
    @difficulty = (node/'Difficulty').inner_html
    @speaker_name = (node/'SpeakerName').inner_html
    @technology = (node/'Technology').inner_html
    @track = (node/'Track').inner_html
  end

  def start_js
    "new Date("+start.to_s+"000)"
  end

  def id
    [Digest::SHA1.hexdigest(uri)].pack("*m")[0..8]
  end


  def to_js
    %{s.push(new Session({id:"session_#{j(id)}",title:"#{j(title)}",speaker:"#{j(speaker_name)}",start:#{(start_js)},room:"#{j(room)}",difficulty:"#{j(difficulty)}",technology:"#{j(technology)}",track:"#{j(track)}",abstract:"#{j(abstract)}"}));}
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


def unescape_br_tags_in_abstract session
  session.abstract = session.abstract.gsub('&lt;br&gt;', '<br>')
end

def unescape_html_quotes session
  session.abstract = session.abstract.gsub('&quot;', '"')
  session.abstract = session.abstract.gsub('&amp;quot;', '"')
end


main
