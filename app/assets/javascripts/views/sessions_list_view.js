var SessionsListView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },

  render: function() {
    var self = this;
    var $list = $(this.el);

    var groups = this.collection.groupByDate();
    for (var date in groups) {
      var sessions = groups[date];

      var header = (new Date(date)).strftime("%I:%M %P").replace(/^0/,'').escapeHTML();

      $list.append("<li data-role='list-divider'>"+header+"</li>");

      _.each(sessions, function(session) {
        var item = new SessionListItemView({
          model: session,
          hideWhen: self.options.hideWhen,
          hideRoom: self.options.hideRoom,
          hideSpeaker: self.options.hideSpeaker
        });
        $list.append(item.render().el);

      });
    }

    $list.listview('refresh');

    return this;
  },
});

