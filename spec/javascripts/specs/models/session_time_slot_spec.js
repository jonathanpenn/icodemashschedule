describe("SessionTimeSlot", function() {
  var slot = null;

  beforeEach(function() {
    slot = new SessionTimeSlot();
    slot.set({when: new Date('Thu Dec 29 2011 08:00:00 GMT-0500')});
  });

  describe("#when()", function() {
    it("returns the date", function() {
      slot.set({when: new Date(0)});
      expect(slot.when()).toEqual(new Date(0));
    });
  });

  describe("#dayName()", function() {
    it("returns the full weekday name", function() {
      expect(slot.dayName()).toEqual("Thursday");
    });
  });

  describe("#hourName()", function() {
    it("formats the date as just an hour", function() {
      expect(slot.hourName()).toEqual("8:00 am");
    });
  });

  describe("#sessions()", function() {
    it("returns the sessions", function() {
      slot.set({sessions: 'something'});
      expect(slot.sessions()).toEqual('something');
    });
  });

  describe("#pageId()", function() {
    it("generates a url that identifies this slot", function() {
      expect(slot.pageId()).toEqual('sessionslot-1325163600000');
    });
  });

});

