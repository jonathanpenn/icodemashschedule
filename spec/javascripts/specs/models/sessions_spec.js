describe("Sessions", function() {
  var sessions;

  beforeEach(function() {
    sessions = new Sessions();
  });

  describe("serializing to json string", function() {
    beforeEach(function() {
      var session1 = new Session({
        speakerName: "Jonathan Penn",
        technology: "Javascript"
      });

      var session2 = new Session({
        speakerName: "Jack Squat",
        technology: "Stones"
      });

      sessions.add(session1);
      sessions.add(session2);
    });

    it("can save and load to json strings", function() {
      var serialized = sessions.serialize();
      expect(typeof serialized).toBe("string");

      var rehydrated = Sessions.deserialize(serialized);
      expect(rehydrated.models[0].get("speakerName")).toBe("Jonathan Penn");
    });
  });


  describe("#uniqueSessionDates()", function() {
    var sessions = null;

    beforeEach(function() {
      sessions = new Sessions();
      sessions.reset([
        {
          title: "C",
          when: new Date(1295137300000)
        },
        {
          title: "A",
          when: new Date(1295037300000)
        },
        {
          title: "B",
          when: new Date(1295037300000)
        }
      ]);
    });

    it("groups by the date value", function() {
      var dates = sessions.uniqueSessionDates();
      expect(dates.length).toBe(2);
      expect(dates[0]).toEqual(new Date(1295037300000));
      expect(dates[1]).toEqual(new Date(1295137300000));
    });

  });


  describe("#allRoomNames", function() {
    beforeEach(function() {
      sessions.add(new Session({room: 'Room A'}));
      sessions.add(new Session({room: 'Room B'}));
      sessions.add(new Session({room: 'Room B'}));
      sessions.add(new Session({room: ''}));
    });

    it("compacts and uniques the list of rooms", function() {
      var names = _.sortBy(sessions.allRoomNames(), function(s) { return s; });;
      expect(names).toEqual(['Room A', 'Room B']);
    });
  });


  describe("#countFavorites()", function() {
    beforeEach(function() {
      sessions.models = [
        {
          isFavorite: function() { return true; }
        },
        {
          isFavorite: function() { return false; }
        }
      ];
    });

    it("returns the number of sessions marked as a favorite", function() {
      expect(sessions.countFavorites()).toBe(1);
    });
  });


});

