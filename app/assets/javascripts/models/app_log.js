var CacheLog = null;
var APILog = null;

(function() {
  var $appCacheLog;
  var $apiLog;

  function $apiLog() {
    return $("#sync .apiLog");
  }
  function $appCacheLog() {
    return $("#sync .appCacheLog");
  }

  CacheLog = {
    clear: function() {
      $appCacheLog().empty();
    },

    puts: function(str) {
      $appCacheLog().append("<p>" + _.escape(str) + "</p>");
    }
  };

  APILog = {
    clear: function() {
      $apiLog().empty();
    },

    puts: function(str) {
      $apiLog().append("<p>" + _.escape(str) + "</p>");
    }
  };

})();

