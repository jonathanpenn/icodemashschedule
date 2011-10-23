describe("Sessions", function() {
  var sessions;

  beforeEach(function() {
    sessions = new Sessions();
  });

  it("has the latest url for json session list", function() {
    expect(sessions.url).toBe("http://2011.codemash.org/rest/sessions.json");
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
      expect(result.when).toBe("/Date(1295037300000)/");
    });

    it("parses when the talk is", function() {
      expect(result.when).toBe("/Date(1295037300000)/");
    });

  });

});

