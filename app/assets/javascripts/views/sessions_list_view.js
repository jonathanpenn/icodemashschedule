var SessionsListView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
    Favorites.bind('change', this.render);
  },

  render: function() {
    var self = this;
    var $list = $(this.el);

    $list.empty();

    this.collection.each(function(session) {
      var item = new SessionListItemView({ model: session });
      $list.append(item.render().el);
    });

    _.defer(function() {
      $list.listview('refresh');
    });

    return this;
  },
});

