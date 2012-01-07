var Notification = null;
var CacheLog = null;
var APILog = null;

(function() {

  function $apiLog() {
    return $("#sync .apiLog p");
  }
  function $appCacheLog() {
    return $("#sync .appCacheLog p");
  }
  function $notification() {
    return $("#home_page .notification");
  }

  function timestamp(date)
  {
    if (date) return date.strftime("%a, %Y-%m-%d %H:%M:%S %Z");
  }

  CacheLog = {
    timestamp: function(date) {
      if (date) this.puts(timestamp(date));
      else this.puts("Never");
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
    timestamp: function(date) {
      if (date) this.puts(timestamp(date));
      else this.puts("Never");
    },

    clear: function() {
      $apiLog().empty()
    },

    puts: function(str) {
      var text = $apiLog().html();
      $apiLog().html(text + "<br>" + _.escape(str));
    }
  };

  Notification = {
    hide: function() { $notification().empty(); },
    show: function(text) { $notification().text(text); }
  }

})();

