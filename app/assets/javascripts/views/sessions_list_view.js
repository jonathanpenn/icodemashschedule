var SessionsListView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },

  render: function() {
    var self = this;
    var $list = $(this.el);

    this.collection.each(function(session) {
      var item = new SessionListItemView({
        model: session,
        hideWhen: self.options.hideWhen,
        hideRoom: self.options.hideRoom,
        hideSpeaker: self.options.hideSpeaker
      });
      $list.append(item.render().el);

      $list.listview('refresh');
    });


    return this;
  },
});

