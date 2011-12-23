var SessionsListView = Backbone.View.extend({
  el: '#sessions_list',

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },

  render: function() {
    var $list = $(this.el);
    $list.empty();

    this.collection.each(function(session) {
      var item = new SessionListItemView({model: session});
      $list.append(item.render().el);
    });

    $list.listview('refresh');

    return this;
  },
});

var SessionListItemView = Backbone.View.extend({
  tagName: 'li',

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    $(this.el).html(" \
                    <a href='#'> \
                      <div class='title'>" + this.model.title() + "</div> \
                      <div class='wherewhen'> \
                        " + this.model.when().strftime("%a @ %I:%M %P") + ", \
                        " + this.model.room() + " \
                      </div> \
                      <div class='speaker'>" + this.model.get('speakerName') + "</div> \
                    </a> \
                    ");
    return this;
  }
});

