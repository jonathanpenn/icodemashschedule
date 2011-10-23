//=require ./session

Sessions = Backbone.Collection.extend({
  model: Session,
  url: 'http://2011.codemash.org/rest/sessions.json',

  parse: function(response) {
    return _.map(response, function(record) {
      return {
        abstract: record.Abstract,
        difficulty: record.Difficulty,
        lookup: record.Lookup,
        room: record.Room,
        speakerName: record.SpeakerName,
        speakerUri: record.SpeakerURI,
        when:  record.Start,
        technology: record.Technology,
        title: record.Title,
        track: record.Track,
        uri: record.URI
      };
    });
  }

});

