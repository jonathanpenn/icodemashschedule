FilteredCollection = Backbone.Collection.extend({
  initialize: function(options) {
    _.bindAll(this, "triggerFilter", "query");
    this.parent_collection = options.parent_collection;
    if (options.query) this.query = options.query;

    this.parent_collection.bind('reset', this.triggerFilter);
  },

  query: function(record) {
    return true;
  },

  triggerFilter: function() {
    var filtered = this.parent_collection.filter(this.query);
    var json = _.map(this.parent_collection.filter(this.query), function(record) {
      return record.toJSON();
    });

    this.reset(json);
  }
});

