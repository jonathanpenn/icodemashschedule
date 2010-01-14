$(document).ready(function() {

  var cache = window.applicationCache;
  if (!cache) { return; }

  var $status = $("#version");

  function checkOnError()
  {
    $status.html("Network error checking for updates").
      addClass("error").
      removeClass("updating");
  }

  function finish()
  {
    $status.html("Update complete. Restart app to finish.");
  }


  var moved = false;
  var count = 0;
  var numFiles = 48;
  function progressUpdate()
  {
    if (!moved) {
      $status.closest("body > div").find(".toolbar").after($status);
      $status.addClass("updating").html('Updating application...<span></span>');;
      moved = true;
    }
    count++;
    $status.find('span').text((count/numFiles*100).toFixed(0)+'%');
  }

  cache.addEventListener('error', checkOnError, false);
  cache.addEventListener('updateready', finish, false);
  cache.addEventListener('progress', progressUpdate, false);

});
