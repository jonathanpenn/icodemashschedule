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

  var wednesdayStart = new Date(1326258000000);
  var thursdayStart = new Date(1326344400000);
  var fridayStart = new Date(1326430800000);

  function precompilerQuery(record) {
    return record.when() < thursdayStart;
  }

  function thursdayQuery(record) {
    var when = record.when();
    return when > thursdayStart && when < fridayStart;
  }

  function fridayQuery(record) {
    return record.when() > fridayStart;
  }

  return SessionFilter;

})();
