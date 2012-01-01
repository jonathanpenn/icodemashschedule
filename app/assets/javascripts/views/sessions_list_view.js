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
    $list.next("p").remove();

    var lastGroup = null;
    if (this.collection.models.length > 0) {
      this.collection.each(function(session) {
        if (self.options.groupByDate) {
          var timeString = session.when().strftime("%A %I:%M %P").replace(/ 0/, ' ');

          if (timeString != lastGroup) {
            lastGroup = timeString;
            $list.append('<li data-role="list-divider">'+lastGroup+'</li>');
          }
        }

        var item = new SessionListItemView({ model: session });
        $list.append(item.render().el);
      });
    } else {
      $list.after("<p class='notfound'>No sessions found.</p>");
    }

    _.defer(function() {
      $list.listview('refresh');
    });

    return this;
  },
});

