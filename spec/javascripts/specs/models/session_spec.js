describe("Session", function() {
  var session;

  beforeEach(function() {
    session = new Session({});
  });

  describe("#room()", function() {
    it("converts single letter rooms to 'Room E'", function() {
      session.set({'room': 'E'});
      expect(session.room()).toBe("Room E");
    });

    it("leaves other room names alone", function() {
      session.set({'room': 'Banyan'});
      expect(session.room()).toBe("Banyan");
    });
  });

  describe("#isPreCompiler()", function() {
    it("returns true if title text starts with 'PreCompiler:'", function() {
      session.set({'title': 'PreCompiler: Session'});
      expect(session.isPreCompiler()).toBe(true);
    });

    it("returns false if title text does not start with 'PreCompiler:'", function() {
      session.set({'title': 'Session'});
      expect(session.isPreCompiler()).toBe(false);
    });
  });

  describe("#title()", function() {
    it("returns title text without 'PreCompiler:'", function() {
      session.set({'title': 'PreCompiler: Session'});
      expect(session.title()).toBe('Session');
    });

    it("returns unchanged text otherwise", function() {
      session.set({'title': 'Session'});
      expect(session.title()).toBe('Session');
    });
  });

  describe("#uniqueId()", function() {
    it("downcases the lookup attribute", function() {
      session.set({lookup: 'One-Spleen-Two-Spleen'});
      expect(session.uniqueId()).toBe('one-spleen-two-spleen');
    });
  });

});

