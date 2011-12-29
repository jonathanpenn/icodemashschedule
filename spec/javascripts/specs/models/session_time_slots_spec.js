describe("SessionTimeSlots", function() {
  var sessions = null;
  var slots = null;

  beforeEach(function() {
    sessions = new Sessions();
    slots = new SessionTimeSlots({sessions: sessions});
  });

  it("resets it self when sessions collection resets", function() {
    var didReset = false;
    slots.bind('reset', function() { didReset = true; });
    sessions.trigger('reset');
    expect(didReset).toBe(true);
  });

  it("creates session time slots from sessions", function() {
    sessions.reset([
      {
        when: new Date('Thu Dec 29 2011 12:00:00 GMT-0500')
      },
      {
        when: new Date('Thu Dec 29 2011 12:00:00 GMT-0500')
      },
      {
        when: new Date('Fri Dec 30 2011 12:00:00 GMT-0500')
      }
    ]);
    expect(slots.at(0).dayName()).toEqual('Thursday');
  });

});

