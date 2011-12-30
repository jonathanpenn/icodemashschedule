var FavoriteCountBubbleView = Backbone.View.extend({
  tagName: 'span',

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.sessions = options.sessions;
    Favorites.bind('change', this.render);
  },

  render: function() {
    $(this.el).addClass('ui-li-count');
    var count = this.sessions.countFavorites();
    if (count > 0) {
      $(this.el).show().text(count);
    } else {
      $(this.el).hide();
    }

    return this;
  }

});

