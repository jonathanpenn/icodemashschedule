var SessionListPageView = Backbone.View.extend({

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.template = _.template($("#session_list_page_template").html());
    this.el = $(this.template());
    this.$header = this.el.children(":jqmData(role=header)");
    this.$content = this.el.children(":jqmData(role=content)");
  },

  render: function() {
    this.setTitle(this.options.title);

    this.el.attr('id', this.options.id);

    $("body").append(this.el);
    this.el.page();

    var view = new SessionsListView({
      collection: this.options.sessions,
      el: this.$content.children(".sessions_list"),
      groupByDate: this.options.groupByDate
    });

    view.render();

    return this;
  },

  setTitle: function(title) {
    this.$header.children('h1').text(title);
  }

});

