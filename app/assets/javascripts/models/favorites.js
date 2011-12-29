var FavoritesCollection = Backbone.Collection.extend({

  initialize: function() {
    _.bindAll(this, 'listChanged');
    this.bind('add', this.listChanged);
    this.bind('remove', this.listChanged);
  },

  containsSession: function(session) {
    return this.indexOf(session) !== -1;
  },

  listChanged: function() {
    this.trigger('change');
  }
});

var Favorites = new FavoritesCollection();

