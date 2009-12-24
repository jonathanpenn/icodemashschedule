function Favorites(serializedData)
{

  if (serializedData) {
    this.ids = serializedData.split(",");
  } else {
    this.ids = [];
  }

  this.addSession = function(session)
  {
    this.ids.push(session.id);
  }

  this.removeSession = function(session)
  {
    var newarray = [];
    for (k in this.ids) {
      if (this.ids[k] != session.id) { newarray.push(this.ids[k]); }
    }

    this.ids = newarray;
  }

  this.hasSession = function(session)
  {
    for (k in this.ids) {
      if (this.ids[k] == session.id) { return true; }
    }
    return false;
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
    return this.ids.join(',');
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
    favorites.addSession($session.data('session'));
    SaveFavorites();
  }

  function toggleGraphics($session)
  {
    $session.toggleClass('favorite');
    var id = $session.data('session').id;
    $("a[href=#"+id+"]").toggleClass('favorite');
  }
}
