//= require ./constants
//= require ./filtered_sessions

SessionFilter = (function() {

  SessionFilter = {
    filteredBy: function(query) {
      return new FilteredSessions({query: query});
    },

    precompiler: function() {
      return this.filteredBy(precompilerQuery);
    },

    thursday: function() {
      return this.filteredBy(thursdayQuery);
    },

    friday: function() {
      return this.filteredBy(fridayQuery);
    },

    byTitleOrSpeakerSearch: function(term) {
      return this.filteredBy(function(record) {
        return record.speakerName().toLowerCase().indexOf(term) >= 0 ||
          record.title().toLowerCase().indexOf(term) >= 0;
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

  return SessionFilter;

})();
