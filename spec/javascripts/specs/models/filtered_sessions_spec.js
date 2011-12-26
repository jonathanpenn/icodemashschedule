describe("FilteredSessions", function() {
  var parentCollection;
  var filtered;

  function resetCollection()
  {
    parentCollection.reset(
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
    parentCollection = new Backbone.Collection();
  });

  describe("filtering and sorting", function() {
    var resetCounter;

    beforeEach(function() {
      resetCounter = 0;
      filtered = new FilteredSessions({
        parentCollection: parentCollection,
        query: function(record) { return record.get('color') == 'white'; },
        comparator: function(record) { return record.get('name'); }
      });
      filtered.bind('reset', function() { resetCounter++; });
      resetCollection();
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

