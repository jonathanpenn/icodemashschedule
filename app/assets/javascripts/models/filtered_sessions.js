//=require ./sessions

FilteredSessions = Backbone.Collection.extend({
  model: Session,

  initialize: function(options) {
    _.bindAll(this, "triggerFilter", "query");
    this.all_sessions = options.all_sessions;
    if (options.query) this.query = options.query;

    this.all_sessions.bind('reset', this.triggerFilter);
  },

  query: function(record) {
    return true;
  },

  triggerFilter: function() {
    var filtered = this.all_sessions.filter(this.query);
    var json = _.map(this.all_sessions.filter(this.query), function(record) {
      return record.toJSON();
    });

    this.reset(json);
  }
});

