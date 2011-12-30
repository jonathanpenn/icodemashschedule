var FavoritesCollection = Backbone.Model.extend({

  initialize: function(options) {
    _.bindAll(this, 'listChanged');
    if (options.favorites) this._favorites = options.favorites;
    else this._favorites = [];
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
    window.localStorage['favorites'] = JSON.stringify(this._favorites);
  },

  load: function() {
    var data = window.localStorage['favorites'];
    if (data) {
      var parsed = JSON.parse(data);
      if (parsed) this._favorites = parsed;
    }
  }

});

var Favorites = new FavoritesCollection();

