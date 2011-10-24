describe("FilteredSessions", function() {
  var sessions;
  var filtered;

  function resetSessions()
  {
    sessions.reset(
      [
        {
          name: "bbb",
          color: "white"
        },
        {
          name: "ccc",
          color: "blue"
        },
        {
          name: "aaa",
          color: "white"
        }
      ]
    );
  }

  beforeEach(function() {
    sessions = new Sessions();
    filtered = new FilteredSessions({all_sessions: sessions});

  });

  describe("filtering and sorting", function() {
    var resetCounter;

    beforeEach(function() {
      resetCounter = 0;
      filtered.query = function(record) { return record.get('color') == 'white'; }
      filtered.bind('reset', function() { resetCounter++; });
      filtered.comparator = function(record) { return record.get('name'); }
      resetSessions();
    });

    it("filters by the given filtering function", function() {
      expect(filtered.models.length).toBe(2);
    });

    it("triggers a single reset event on the collection when filtered", function() {
      expect(resetCounter).toBe(1);
    });

    it("sorts result by the comparator", function() {
      var result = _.map(filtered.models, function(r) { return r.get('name'); });
      expect(result).toEqual(['aaa', 'bbb']);
    });

  });

});

