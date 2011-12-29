var SessionsHourListItemView = Backbone.View.extend({
  tagName: 'li',

  initialize: function(options) {
    _.bindAll(this, 'render');
    if (!SessionsHourListItemView.template) {
      SessionsHourListItemView.template = _.template($("#sessions_hour_list_item_template").html());
    }
  },

  render: function() {
    var slot = this.options.slot;
    var locals = {
      title: slot.hourName(),
      href: "#" + slot.pageId()
    };

    var html = SessionsHourListItemView.template(locals);

    $(this.el).html(html);

    return this;
  }
});

