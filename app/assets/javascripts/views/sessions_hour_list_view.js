var SessionsHourListView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
    Favorites.bind('change', this.render);
  },

  render: function() {
    var self = this;
    var $list = $(this.el);

    $list.empty();
    $list.next("p").remove();

    if (this.collection.models.length > 0) {

      this.collection.each(function(slot) {
        var item = new SessionsHourListItemView({
          slot: slot
        });

        $list.append(item.render().el);
      });

      _.defer(function() {
        $list.listview('refresh');
      });

    } else {
      $list.after("<p class='notfound'>No data found.</p>");
    }

    return this;
  },
});

