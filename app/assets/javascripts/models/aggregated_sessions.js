//=require ./session

var AggregatedSessions = Backbone.Collection.extend({
  model: Session,

  sessionsUrl: 'http://www.codemash.org/rest/sessions.json',
  precompilerUrl: 'http://www.codemash.org/rest/precompiler.json',

  url: function() {
    if (this.precompiler) return this.precompilerUrl;
    else return this.sessionsUrl;
  },

  initialize: function(options) {
    if (options) this.precompiler = options.precompiler;
  },

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
  }
});

