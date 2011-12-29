var SessionsListView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
  },

  render: function() {
    var self = this;
    var $list = $(this.el);

    this.options.sessions.each(function(session) {
      var item = new SessionListItemView({ model: session });
      $list.append(item.render().el);

    });

    $list.listview('refresh');

    return this;
  },
});

