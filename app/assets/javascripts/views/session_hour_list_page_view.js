var SessionHourListPageView = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'render');
    this.template = _.template($("#session_hour_list_page_template").html());
    this.el = $(this.template());
    this.$header = this.el.children(":jqmData(role=header)");
    this.$content = this.el.children(":jqmData(role=content)");
  },

  render: function() {
    this.setTitle(this.options.title);

    this.el.attr('id', this.options.id);

    $("body").append(this.el);
    this.el.page();

    var view = new SessionsHourListView({
      collection: this.options.sessions,
      el: this.$content.children(".hour_list")
    });

    view.render();

    return this;
  },

  setTitle: function(title) {
    this.$header.children('h1').text(title);
  }
});

