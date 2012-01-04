//= require ./constants
//= require ./filtered_sessions

SessionFilter = function(sessions) {

  var result = {
    by: function(query) {
      return new FilteredSessions({
        parentCollection: sessions,
        query: query
      });
    },

    precompiler: function() {
      return this.by(precompilerQuery);
    },

    thursday: function() {
      return this.by(thursdayQuery);
    },

    friday: function() {
      return this.by(fridayQuery);
    },

    byTimeSlot: function(when) {
      return this.by(function(session) {
        return session.when().valueOf() == when.valueOf();
      });
    },

    byTitleOrSpeakerSearch: function(term) {
      return this.by(function(record) {
        return record.speakerName().toLowerCase().indexOf(term) >= 0 ||
          record.title().toLowerCase().indexOf(term) >= 0;
      });
    },

    byFullSearch: function(terms) {
      return this.by(function(record) {
        var fulltext = record.fulltext();
        var ands = terms.toLowerCase().split(" ");
        return _.all(ands, function(term) {
          return fulltext.indexOf(term) >= 0;
        });
      });
    }
  }

  function precompilerQuery(record) {
    return record.when() < Constants.thursdayStart;
  }

  function thursdayQuery(record) {
    var when = record.when();
    return when > Constants.thursdayStart && when < Constants.fridayStart;
  }

  function fridayQuery(record) {
    return record.when() > Constants.fridayStart;
  }

  return result;
}

