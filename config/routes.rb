require 'cache_manifest'

CodeMash::Application.routes.draw do

  match "/application.manifest" => CacheManifest.new(Rails.env.production?)
  match "/javascript/specs" => "specs#index"
  match "/app.html" => "home#index"
  match "/sessions.json" => "home#sessions"
  match "/precompiler.json" => "home#precompiler"
  root to: redirect('/app.html')

end
