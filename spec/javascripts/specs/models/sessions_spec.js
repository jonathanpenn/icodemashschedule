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

});

