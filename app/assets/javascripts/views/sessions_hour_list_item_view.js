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
    var sessions = slot.sessions();
    var title, href;

    if (sessions.models.length == 1) {
      title = slot.hourName() + "<span class='innertitle'> - " + _.escape(sessions.models[0].title()) + "</span>";
      href = "#" + sessions.models[0].pageId();
    } else {
      title = slot.hourName();
      href = "#" + slot.pageId();
    }

    var locals = {
      title: title,
      href: href
    };

    var html = SessionsHourListItemView.template(locals);

    $(this.el).html(html);

    var bubble = new FavoriteCountBubbleView({ sessions: sessions });

    $(this.el).find('a').append(bubble.render().el);

    return this;
  }

});

