describe("FilteredCollection", function() {
  var parent_collection;
  var filtered;

  function resetCollection()
  {
    parent_collection.reset(
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
    parent_collection = new Backbone.Collection();
    filtered = new FilteredCollection({parent_collection: parent_collection});

  });

  describe("filtering and sorting", function() {
    var resetCounter;

    beforeEach(function() {
      resetCounter = 0;
      filtered.query = function(record) { return record.get('color') == 'white'; }
      filtered.bind('reset', function() { resetCounter++; });
      filtered.comparator = function(record) { return record.get('name'); }
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

