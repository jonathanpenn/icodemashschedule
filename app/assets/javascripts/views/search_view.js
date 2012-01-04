var SearchView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render', 'handleKeypress');
    this.collection = Database.sessions;
    this.collection.bind('reset', this.render);
    Favorites.bind('change', this.render);
    this.$input = $(this.el).find("input");

    this.lazyrender = _.debounce(this.render, 600);
  },

  events: {
    'keyup input': 'handleKeypress',
    'change input': 'handleKeypress'
  },

  render: function() {
    var self = this;
    var $list = $(this.el).find("ul");
    var terms = this.$input.val();

    $list.empty();
    $list.next("p").remove();

    if (terms === null || terms.length === 0) {
      _.defer(function() {
        $list.listview('refresh');
      });
      return;
    }

    var sessions = this.collection.filter().byFullSearch(terms);
    var lastGroup = null;
    if (sessions.models.length > 0) {
      sessions.each(function(session) {
        var timeString = session.when().strftime("%A %I:%M %P").replace(/ 0/, ' ');

        if (timeString != lastGroup) {
          lastGroup = timeString;
          $list.append('<li data-role="list-divider">'+lastGroup+'</li>');
        }

        var item = new SessionListItemView({ model: session, showExtra: true });
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

  handleKeypress: function(e) {
    this.lazyrender();
  }

});

$("#search").live('pageinit', function() {
  var view = new SearchView({el: $("#search")});
});

