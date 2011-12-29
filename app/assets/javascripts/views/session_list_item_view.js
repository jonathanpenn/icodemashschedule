var SessionListItemView = Backbone.View.extend({
  tagName: 'li',

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    if (!SessionListItemView.template) {
      SessionListItemView.template = _.template($("#sessions_list_item_template").html());
    }
  },

  render: function() {
    var locals = {
      title: this.model.title().escapeHTML(),
      when: this.model.when().strftime("%a @ %I:%M %P").replace(/ 0/,' ').escapeHTML(),
      room: this.model.room().escapeHTML(),
      speakerName: this.model.get('speakerName').escapeHTML(),
      href: "#" + Router.generateSessionId(this.model)
    };

    var html = SessionListItemView.template(locals);

    $(this.el).html(html);

    return this;
  }
});

