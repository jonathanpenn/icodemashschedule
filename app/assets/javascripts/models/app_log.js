var CacheLog = null;
var APILog = null;

(function() {
  var $appCacheLog;
  var $apiLog;

  function $apiLog() {
    return $("#sync .apiLog p");
  }
  function $appCacheLog() {
    return $("#sync .appCacheLog p");
  }

  function timestamp()
  {
    return (new Date()).strftime("-- %a, %Y-%m-%d %H:%M:%S %Z");
  }

  CacheLog = {
    timestamp: function() {
      this.puts(timestamp());
    },

    clear: function() {
      $appCacheLog().empty();
    },

    puts: function(str) {
      var text = $appCacheLog().html();
      $appCacheLog().html(text + "<br>" + _.escape(str));
    }
  };

  APILog = {
    timestamp: function() {
      this.puts(timestamp());
    },

    clear: function() {
      $apiLog().empty()
    },

    puts: function(str) {
      var text = $apiLog().html();
      $apiLog().html(text + "<br>" + _.escape(str));
    }
  };

})();

