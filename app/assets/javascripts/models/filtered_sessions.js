//= require ./sessions

FilteredSessions = Sessions.extend({
  initialize: function(options) {
    _.bindAll(this, "triggerFilter", "query");

    this.parentCollection = options.parentCollection;

    if (options.query)      this.query      = options.query;
    if (options.comparator) this.comparator = options.comparator;

    this.parentCollection.bind('reset', this.triggerFilter);
    this.triggerFilter();
  },

  query: function(record) {
    return true;
  },

  triggerFilter: function() {
    var self = this;
    this.reset(null, {silent: true});
    this.parentCollection.forEach(function(record) {
      if (self.query(record)) {
        self.add(record, {silent: true});
      }
    });

    this.trigger('reset');
  }
});

