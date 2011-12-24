//=require ./session

Sessions = Backbone.Collection.extend({
  model: Session,
  url: 'http://2011.codemash.org/rest/sessions.json',

  parse: function(response) {
    var parseDate = function(jsondate) {
      var datenum = jsondate.match(/\(([^\)]+)\)/)[1] - 0;
      return new Date(datenum);
    }

    return _.map(response, function(record) {
      return {
        abstract: record.Abstract,
        difficulty: record.Difficulty,
        lookup: record.Lookup,
        room: record.Room,
        speakerName: record.SpeakerName,
        speakerUri: record.SpeakerURI,
        when:  parseDate(record.Start),
        technology: record.Technology,
        title: record.Title,
        track: record.Track,
        uri: record.URI
      };
    });
  },

  comparator: function(session) {
    return session.when().valueOf() + session.get('title');
  },

  serialize: function() {
    return JSON.stringify(this.toJSON());
  }

});

Sessions.deserialize = function(data) {
  if (typeof data !== "string") throw "Expected string but got " + data;
  return new Sessions(JSON.parse(data));
}

