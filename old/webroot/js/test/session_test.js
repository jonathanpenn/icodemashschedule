$(document).ready(function() {

  module("Session", {setup:setup});

  var session;

  function setup()
  {
    session = new Session({
      id:"session_1",
      title:"Some Session",
      speaker:"Johnny Fedora",
      room:"Bathroom",
      start: new Date(43215),
      difficulty:"Beginner",
      technology:"Java",
      track:"Web Frameworks",
      abstract:"We'll Learn Stuff"
    });
  }


  test("initialization", function() {
    expect(9);
    equals( session.id, 'session_1', "it has the session id" );
    equals( session.title, 'Some Session', "it has a title" );
    equals( session.speaker, 'Johnny Fedora', "it has a speaker" );
    equals( session.room, "Bathroom", "has a room" );
    equals( session.start.valueOf(), (new Date(43215)).valueOf(),
      "it has a start date" );
    equals( session.difficulty, "Beginner", "it has a difficulty" );
    equals( session.technology, "Java", "it has a technology" );
    equals( session.track, "Web Frameworks", "it has a track" );
    equals( session.abstract, "We'll Learn Stuff", "it has an abstract" );
  });


  test(".dayGroup()", function() {
    expect(1);
    equals( session.dayGroup(), 'Wednesday' );
  });


  test(".timeGroup()", function() {
    expect(1);
    equals( session.timeGroup(), '7:00 pm' );
  });


  test(".slotGroup()", function() {
    expect(1);
    equals( session.slotGroup(), session.start.valueOf() );
  });

});



$(document).ready(function() {

  module("SortSessions");


  test(".byStartTime(sessions)", function() {
    var sessions = [
      {start: 1, title: 'a'},
      {start: 3, title: 'a'},
      {start: 2, title: 'b'},
      {start: 2, title: 'a'}
    ];

    sessions = SortSessions.byStartTime(sessions);
    expect(6);
    equals( sessions[0].start, 1);
    equals( sessions[1].start, 2);
    equals( sessions[1].title, 'a');
    equals( sessions[2].start, 2);
    equals( sessions[2].title, 'b');
    equals( sessions[3].start, 3);
  });

});



$(document).ready(function() {

  module("GroupSessions", {setup: setup, teardown: teardown});

  var oldGroupBy;

  function setup()
  {
    oldGroupBy = $.groupBy;
    $.groupBy = function(arr, grouper) {
      return grouper;
    };
  }

  function teardown()
  {
    $.groupBy = oldGroupBy;
  }


  test(".byDayGroup()", function() {
    var grouper = GroupSessions.byDayGroup([]);
    var obj = { dayGroup: function() { return 'yes'; } };

    expect(1);
    equals( grouper(obj), 'yes', "the grouper calls dayGroup() on objects" );
  });


  test(".byTimeGroup()", function() {
    var grouper = GroupSessions.byTimeGroup([]);
    var obj = { timeGroup: function() { return 'yes'; } };

    expect(1);
    equals( grouper(obj), 'yes', "the grouper calls timeGroup() on objects" );
  });


  test(".bySlotGroup()", function() {
    var grouper = GroupSessions.bySlotGroup([]);
    var obj = { slotGroup: function() { return 'yes'; } };

    expect(1);
    equals( grouper(obj), 'yes', "the grouper calls slotGroup() on objects" );
  });

});


$(document).ready(function() {

  module("FindsSession", {setup:setup});

  var finder;
  var sessions = [
    {id: 'ses1', title: 'a'},
    {id: 'ses2', title: 'b'}
  ];

  function setup()
  {
    finder = new FindsSession(sessions);
  }


  test(".byId(id)", function() {
    expect(2);
    equals( finder.byId('ses1').title, 'a', "finds session by id" );
    equals( finder.byId('none'), undefined, "returns undefined if not found" );
  });
});
