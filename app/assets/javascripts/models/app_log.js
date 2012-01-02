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

  CacheLog = {
    clear: function() {
      $appCacheLog().empty();
    },

    puts: function(str) {
      var text = $appCacheLog().html();
      $appCacheLog().html(text + "<br>" + _.escape(str));
    }
  };

  APILog = {
    clear: function() {
      $apiLog().empty()
    },

    puts: function(str) {
      var text = $apiLog().html();
      $apiLog().html(text + "<br>" + _.escape(str));
    }
  };

})();

