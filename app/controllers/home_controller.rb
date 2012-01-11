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
    text = Rails.cache.fetch url, expires_in: 1.minute do
      open(url).read
    end

    render text: text, format: 'json'
  end

end
