//=require ./session

Sessions = Backbone.Collection.extend({
  model: Session,

  url: 'http://rest.codemash.org/api/sessions.json',

  parse: function(response) {
    var parseDate = function(jsondate) {
      return Date.parse(jsondate);
    }

    return _.map(response, function(record) {
      return {
        abstract: record.Abstract,
        difficulty: record.Difficulty,
        lookup: record.SessionLookupId,
        room: record.Room,
        speakerName: record.SpeakerName,
        speakerUri: record.SpeakerURI,
        when:  parseDate(record.Start),
        technology: record.Technology,
        title: record.Title,
        uri: record.URI
      };
    });
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

