var PageView = Backbone.View.extend({

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.template = _.template($("#page_template").html());
    this.el = $(this.template());
    this.el.attr('id', this.options.id);
    this.$header = this.el.children(":jqmData(role=header)");
    this.$content = this.el.children(":jqmData(role=content)");
  },

  render: function() {
    $("body").append(this.el);
    this.el.page();
    return this;
  },

  setTitle: function(title) {
    this.$header.children('h1').text(title);
  }

});

