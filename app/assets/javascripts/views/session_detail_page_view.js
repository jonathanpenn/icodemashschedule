var SessionDetailPageView = Backbone.View.extend({
  tagName: 'div',

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);

    this.template = _.template($("#session_detail_page_template").html());

    $(this.el).attr('data-role', 'page');
  },

  render: function() {
    var locals = {
      title: this.model.title().escapeHTML(),
      speaker: this.model.speakerName().escapeHTML(),
      room: this.model.room().escapeHTML(),
      technology: this.model.get('technology').escapeHTML(),
      difficulty: this.model.get('difficulty').escapeHTML(),
      track: this.model.get('track'),
      abstract: this.model.get('abstract').escapeHTML(),
      when: this.model.when().strftime("%A, %I:%M %P").replace(/ 0/, ' ').escapeHTML(),
      roomPageId: 'room'
    }

    var $page = $(this.el);

    $page.attr('id', this.options.id);
    $page.html(this.template(locals));

    $page.page();

    return this;
  }

});

