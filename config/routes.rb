cache_version = Time.now.to_f
do_cache = true
CodeMash::Application.routes.draw do

  if do_cache
    match "/application.manifest" => Proc.new { |env|
      body = []
      body << "CACHE MANIFEST"
      body << "# v%s" % [cache_version]
      body << ""
      body << "/app.html"
      body << "/assets/application.css"
      body << "/assets/application.js"
      body << "/assets/room_map.jpg"
      body << "/assets/fav_on.png"
      body << "/assets/fav_off.png"
      body << "/assets/ajax-loader.gif"
      body << "/assets/dot.png"
      body << "/assets/jquery-mobile/ajax-loader.png"
      body << "/assets/jquery-mobile/icons-18-white.png"
      body << "/assets/jquery-mobile/icons-36-white.png"
      body << ""
      body << "NETWORK:"
      body << "*"
      body << ""
      [200, {"Content-Type" => "text/cache-manifest"}, [body.join("\n")]]
    }
  else
    match "/application.manifest" => Proc.new { |env|
      body = []
      body << "CACHE MANIFEST"
      body << "# v%s" % [Time.now.to_f]
      body << "NETWORK:\n*\n\n"
      [200, {"Content-Type" => "text/cache-manifest"}, [body.join("\n")]]
    }
  end

  match "/javascript/specs" => "specs#index"

  match "/app.html" => "home#index"

  root to: redirect('/app.html')
end
