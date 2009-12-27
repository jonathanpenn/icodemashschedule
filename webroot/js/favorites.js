function Favorites(serializedData)
{
  var sessions = {};

  if (serializedData) {
    sessions = deserialize(serializedData);
  }

  this.ids = function()
  {
    return $.keys(sessions);
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


function initializeFavorites()
{
  if (!window.favorites) { window.favorites = new Favorites(); }
  loadFavorites();

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
      $a.bind('tap', favoriteTapped);
    } else {
      $a.bind('click', favoriteTapped);
    }

    if (window.favorites.hasSession(session)) {
      toggleGraphics($session);
    }
  });

  updateFavoritesPanel();


  function favoriteTapped(event)
  {
    event.preventDefault();
    var $session = $(this).closest('.session');
    toggleGraphics($session);
    favorites.toggleSession($session.data('session'));
    saveFavorites();
    updateFavoritesPanel();
  }

  function toggleGraphics($session)
  {
    $session.toggleClass('favorite');
    var id = $session.data('session').id;
    $("a[href=#"+id+"]").toggleClass('favorite');
  }

  function saveFavorites()
  {
    window.localStorage.favorites = window.favorites.serialize();
  }

  function loadFavorites()
  {
    window.favorites = new Favorites(window.localStorage.favorites);
  }

  function updateFavoritesPanel()
  {
    $("#favorites").find("> .toolbar").nextAll().remove();
    $("#favListLink").find(".counter").html(favorites.ids().length);

    if (favorites.ids().length > 0) {
      var favlist = new FavoritesList(sessions, favorites);
      $("#favorites").find("> .toolbar").after(favlist.$render());
    } else {
      $("#favorites").find("> .toolbar").after("\
        <p style='margin-top: 30px; text-align: center'>\
          No sessions marked\
        </p>\
      ");
    }

  }
}


function FavoritesList(sessions, favorites)
{
  var weekday = formatting.weekday;
  var shortTime = formatting.shortTime;

  this.$render = function()
  {
    var favsessions = SortSessions.byStartTime(getFavSessions());
    var grouped = GroupSessions.bySlotGroup(favsessions);
    var $html = $("<div></div>");

    for (slot in grouped) {
      var date = new Date(slot-0);
      var displayName = weekday(date) + " "  + shortTime(date);
      $html.append("<h2>"+displayName+"</h2>");
      var $ul = $("<ul class='rounded'></ul>");

      $.each(grouped[slot], function(index, session) {
        var $li = $("<li class='arrow'><a href='#"+session.id+"'></a></li>");
        $li.find("a").html(session.title);
        $ul.append($li);
      });

      $html.append($ul);
    }

    return $html.children();
  }

  function getFavSessions()
  {
    var favs = [];
    var finder = new FindsSession(sessions);
    $.each(favorites.ids(), function(index, id) {
      var session = finder.byId(id);
      if (session) { favs.push(session); }
    });

    return favs;
  }

}
