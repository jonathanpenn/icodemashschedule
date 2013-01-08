var FavoritesCollection = Backbone.Model.extend({

  initialize: function(options) {
    _.bindAll(this, 'listChanged');
    if (options.favorites) this._favorites = options.favorites;
    else this._favorites = [];
  },

  sessions: function() {
    return Database.sessions.filter().by(function(session) {
      return session.isFavorite();
    });
  },

  addFavorite: function(session) {
    this._favorites.push(session.uniqueId());
    this.listChanged();
  },

  removeFavorite: function(session) {
    this._favorites = _.without(this._favorites, session.uniqueId());
    this.listChanged();
  },

  containsSession: function(session) {
    return _.indexOf(this._favorites, session.uniqueId()) !== -1;
  },

  listChanged: function() {
    this.save();
    this.trigger('change');
  },

  save: function() {
    var favoritesString = JSON.stringify(this._favorites);
    window.localStorage['favorites'] = favoritesString;
    var transferUrl = [
      location.protocol + "//",
      location.host,
      location.pathname,
      "#load-" + escape(favoritesString)
    ];
    $("a#saveLink").attr("href", transferUrl.join(''));
  },

  load: function() {
    var data = window.localStorage['favorites'];
    if (data) {
      var parsed = JSON.parse(data);
      if (parsed) this._favorites = parsed;
    }
  },

  parse: function(hashId) {
    var escaped = hashId.replace(/^load-/, '');
    window.localStorage['favorites'] = unescape(escaped);
  },

});

var Favorites = new FavoritesCollection();

