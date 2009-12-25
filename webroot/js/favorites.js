function Favorites(serializedData)
{
  var sessions = {};

  if (serializedData) {
    sessions = deserialize(serializedData);
  }

  this.addSession = function(session)
  {
    sessions[session.id] = true;
  }

  this.removeSession = function(session)
  {
    delete sessions[session.id];
  }

  this.hasSession = function(session)
  {
    return sessions[session.id];
  }

  this.toggleSession = function(session)
  {
    if (this.hasSession(session)) {
      this.removeSession(session);
    } else {
      this.addSession(session);
    }
  }

  this.serialize = function()
  {
    return $.keys(sessions).join(',');
  }

  function deserialize(data)
  {
    var arr = data.split(',');
    var sessions = {};
    for (i in arr) {
      sessions[arr[i]] = true;
    }

    return sessions;
  }

}

function SaveFavorites()
{
  window.localStorage.favorites = window.favorites.serialize();
}

function LoadFavorites()
{
  window.favorites = new Favorites(window.localStorage.favorites);
}

function SetupSessionsForFavorites()
{
  if (!window.favorites) { window.favorites = new Favorites(); }
  LoadFavorites();

  $(".session").each(function() {
    var $session = $(this);
    var session = $session.data('session');
    var $a = $session.find("> .content h1").
      after("<a href='#' class='favStar'></a>").next();

    // If on Mobile Safari, use the tap event.
    // Click events on links can take up to 300ms to register
    // because Mobile Safari has to wait to see if you are
    // double clicking to zoom.
    if ($.support.touch) {
      $a.bind('tap', toggleFavorite);
    } else {
      $a.bind('click', toggleFavorite);
    }

    if (window.favorites.hasSession(session)) {
      toggleGraphics($session);
    }
  });

  function toggleFavorite(event)
  {
    event.preventDefault();
    var $session = $(this).closest('.session');
    toggleGraphics($session);
    favorites.toggleSession($session.data('session'));
    SaveFavorites();
  }

  function toggleGraphics($session)
  {
    $session.toggleClass('favorite');
    var id = $session.data('session').id;
    $("a[href=#"+id+"]").toggleClass('favorite');
  }
}
