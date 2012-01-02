$(document).ready(function() {

  var cache = window.applicationCache;
  if (!cache) {
    CacheLog.puts("Offline cache disabled. Application assets not cached to device.");
    return;
  }

  CacheLog.puts("Offline caching enabled.");

  var moved = false;
  function hideStatus() {
    if (moved) {
      SyncStatus.hide();
      moved = false;
    }
  }

  function showStatus() {
    if (!moved) {
      SyncStatus.show();
      moved = true;
    }
  }

  function checkOnError()
  {
    hideStatus();
    console.log("checkOnError");
    CacheLog.puts("Network error trying to update offline cache.");
  }

  function finish()
  {
    hideStatus();
    console.log("finished");
    CacheLog.puts("Offline cache update complete.");
    CacheLog.puts("Refresh page to finish update.");
  }

  function firstCached()
  {
    hideStatus();
    console.log("firstCached");
    CacheLog.puts("Web app is now cached offline.");
  }

  var pinged = false;
  function progressUpdate()
  {
    showStatus();
    if (!pinged) {
      CacheLog.puts("Checking cache status...");
      pinged = true;
    }
  }

  cache.addEventListener('error', checkOnError, false);
  cache.addEventListener('updateready', finish, false);
  cache.addEventListener('cached', firstCached, false);
  cache.addEventListener('progress', progressUpdate, false);

});

