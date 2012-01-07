//=require ./session

Sessions = Backbone.Collection.extend({
  model: Session,

  fetch: function(options) {
    // Kludgy hack to get the precompiler and normal sessions
    // combined into one collection
    var oldsuccess = options.success;
    var oldcomplete = options.complete;

    var sessions = new AggregatedSessions();
    var precompiler = new AggregatedSessions({precompiler: true});

    var self = this;

    var newoptions = _.extend(options, {
      complete: null,
      success: function() {
        var newoptions = _.extend(options, {
          complete: oldcomplete,
          success: function() {
            self.reset(sessions.models, {silent: true});
            self.add(precompiler.models, {silent: true});
            self.trigger('reset');

            if (oldsuccess) oldsuccess();
          }
        });

        precompiler.fetch(newoptions);
      }
    });

    sessions.fetch(newoptions);
  },

  filter: function() {
    return SessionFilter(this);
  },

  comparator: function(session) {
    var sort = session.when().valueOf() + session.get('title');
    if (session.isFavorite()) return "+" + sort;
    else return sort;
  },

  serialize: function() {
    return JSON.stringify(this.toJSON());
  },

  withUniqueId: function(uniqueId) {
    return this.find(function(session) {
      if (session.uniqueId() === uniqueId) return true;
    });
  },

  uniqueSessionDates: function() {
    var dates = _.reduce(this.models, function(memo, session) {
      memo[session.when()] = true;
      return memo;
    }, {});
    return _(dates).chain().
        keys().
        map(function(s) { return new Date(s); }).
        sortBy(function(d) { return d; }).
        value();
  },

  allRoomNames: function() {
    return _.compact(_.uniq(this.map(function(session) {
      return session.room();
    })));
  },

  countFavorites: function() {
    return this.reduce(function(memo, session) {
      if (session.isFavorite()) return memo+1;
      else return memo;
    }, 0);
  }

});

Sessions.deserialize = function(data) {
  if (typeof data !== "string") throw "Expected string but got " + data;
  return new Sessions(JSON.parse(data));
}

