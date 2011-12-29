var SessionsHourListView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },

  render: function() {
    var self = this;
    var $list = $(this.el);

    $list.empty();

    this.collection.each(function(slot) {
      var item = new SessionsHourListItemView({
        slot: slot
      });

      $list.append(item.render().el);
    });

    _.defer(function() {
      $list.listview('refresh');
    });

    return this;
  },
});

