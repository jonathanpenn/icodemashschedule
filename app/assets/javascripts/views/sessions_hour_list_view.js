var SessionsHourListView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },

  render: function() {
    var self = this;
    var $list = $(this.el);

    $list.empty();

    var groups = this.collection.groupByDate();
    var hours = _.keys(groups);

    _.each(hours, function(hour) {
      var hourString = (new Date(hour)).strftime("%I:%M %P").replace(/^0/,'').escapeHTML();
      var item = new SessionsHourListItemView({
        sessions: groups[hour],
        title: hourString,
        when: hour
      });

      $list.append(item.render().el);
    });

    _.defer(function() {
      $list.listview('refresh');
    });

    return this;
  },
});

