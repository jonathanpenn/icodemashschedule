$(document).ready(function() {

  var cache = window.applicationCache;
  if (!cache) { return; }

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
  }

  function finish()
  {
    hideStatus();
    console.log("finished");
  }

  function firstCached()
  {
    hideStatus();
    console.log("firstCached");
  }

  function progressUpdate()
  {
    showStatus();
    console.log("progressUpdate");
  }

  cache.addEventListener('error', checkOnError, false);
  cache.addEventListener('updateready', finish, false);
  cache.addEventListener('cached', firstCached, false);
  cache.addEventListener('progress', progressUpdate, false);

});

