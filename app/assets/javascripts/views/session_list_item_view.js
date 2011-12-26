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
      title: this.model.title(),
      when: null, room: null, speakerName: null
    };

    if (!this.options.hideWhen) locals.when = this.model.when().strftime("%a @ %I:%M %P");
    if (!this.options.hideRoom) locals.room = this.model.room();
    if (!this.options.hideSpeaker) locals.speakerName = this.model.get('speakerName');

    var html = SessionListItemView.template(locals);

    $(this.el).html(html);

    return this;
  }
});

