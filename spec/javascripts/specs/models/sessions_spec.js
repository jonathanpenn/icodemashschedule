describe("Sessions", function() {
  var sessions;

  beforeEach(function() {
    sessions = new Sessions();
  });

  it("has the latest url for json session list", function() {
    expect(sessions.url).toBe("http://www.codemash.org/rest/sessions.json");
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

  describe("parsing server results", function() {
    var results;

    beforeEach(function() {
      result = sessions.parse([{
        Abstract: "testing",
        Difficulty: "Beginner",
        Lookup: "Going-for-Speed-Testing-for-Performance",
        Room: "Banyan",
        SpeakerName: "Jay Harris",
        SpeakerURI: "/rest/speakers/Jay-Harris",
        Start: "/Date(1295037300000)/",
        Technology: ".NET",
        Title: "Going for Speed: Testing for Performance",
        Track: "Dev Processes and Methodologies",
        URI: "/rest/sessions/Going-for-Speed-Testing-for-Performance"
      }])[0];
    });

    it("parses the session information", function() {
      expect(result.abstract).toBe("testing");
    });

    it("parses the difficulty", function() {
      expect(result.difficulty).toBe("Beginner");
    });

    it("parses the lookup", function() {
      expect(result.lookup).toBe("Going-for-Speed-Testing-for-Performance");
    });

    it("parses the room", function() {
      expect(result.room).toBe("Banyan");
    });

    it("parses the speaker name", function() {
      expect(result.speakerName).toBe("Jay Harris");
    });

    it("parses the speaker uri", function() {
      expect(result.speakerUri).toBe("/rest/speakers/Jay-Harris");
    });

    it("parses when the talk is", function() {
      expect(result.when + "").toBe(new Date(1295037300000) + "");
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


  describe("#filterBy", function() {
    it("returns a new FilteredSessions based on this session", function() {
      oldFilteredSessions = FilteredSessions;
      FilteredSessions = function(options) {
      }
    });
  });

});

