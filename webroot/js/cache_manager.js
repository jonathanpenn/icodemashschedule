$(document).ready(function() {

  var cache = window.applicationCache;
  if (!cache) { return; }

  var $status = $("#version");

  function checkOnError()
  {
    $status.html("Network error checking for updates").
      addClass("error").
      removeClass("updating").
      removeClass("opacityPulse");
  }

  function finish()
  {
    $status.html("Update complete. Restart app to finish.").
      removeClass("opacityPulse");
  }

  function moveStatusToTop()
  {
    $status.closest("body > div").find(".toolbar").after($status);

  }

  function check()
  {
    switch(cache.status) {
      case cache.CHECKING:
        $status.
          addClass("updating").
          addClass("opacityPulse").
          html("Checking for updates...");
        break;
      case cache.UPDATEREADY:
        finish();
        break;
      case cache.DOWNLOADING:
        moveStatusToTop();
        $status.
          html("Updating application...").
          addClass("updating").
          addClass("opacityPulse");
        break;
      case cache.UNCACHED:
        $status.html("Application is not cached offline");
        break;
    }
  }

  cache.addEventListener('error', checkOnError, false);
  cache.addEventListener('updateready', check, false);
  cache.addEventListener('downloading', check, false);
  cache.addEventListener('noupdate', check, false);
  cache.addEventListener('checking', check, false);

});
