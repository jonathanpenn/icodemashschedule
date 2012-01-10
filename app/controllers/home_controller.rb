require 'open-uri'

class HomeController < ApplicationController

  def sessions
    passthrough 'http://www.codemash.org/rest/sessions.json'
  end

  def precompiler
    passthrough 'http://www.codemash.org/rest/precompiler.json'
  end

  private

  def passthrough url
    render open(url).read, format: 'json'
  end

end
