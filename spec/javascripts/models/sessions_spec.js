describe("Sessions", function() {
  var sessions;

  beforeEach(function() {
    sessions = new Sessions();
  });

  it("has the latest url for json session list", function() {
    expect(sessions.url).toBe("http://2011.codemash.org/rest/sessions.json");
  });

});
