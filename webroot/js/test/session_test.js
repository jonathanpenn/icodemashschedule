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
    ok( session.id == 'session_1', "it has the session id" );
    ok( session.title == 'Some Session', "it has a title" );
    ok( session.speaker == 'Johnny Fedora', "it has a speaker" );
    ok( session.room == "Bathroom", "has a room" );
    ok( session.start.valueOf() == (new Date(43215)).valueOf(),
      "it has a start date" );
    ok( session.difficulty == "Beginner", "it has a difficulty" );
    ok( session.technology == "Java", "it has a technology" );
    ok( session.track == "Web Frameworks", "it has a track" );
    ok( session.abstract == "We'll Learn Stuff", "it has an abstract" );
  });


  test(".dayGroup()", function() {
    expect(1);
    ok( session.dayGroup() == 'Wednesday' );
  });


  test(".timeGroup()", function() {
    expect(1);
    ok( session.timeGroup() == '7:00 pm' );
  });


  test(".slotGroup()", function() {
    expect(1);
    ok( session.slotGroup() == session.start.valueOf() );
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
    ok( sessions[0].start == 1);
    ok( sessions[1].start == 2);
    ok( sessions[1].title == 'a');
    ok( sessions[2].start == 2);
    ok( sessions[2].title == 'b');
    ok( sessions[3].start == 3);
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
    ok( grouper(obj) == 'yes', "the grouper calls dayGroup() on objects" );
  });


  test(".byTimeGroup()", function() {
    var grouper = GroupSessions.byTimeGroup([]);
    var obj = { timeGroup: function() { return 'yes'; } };

    expect(1);
    ok( grouper(obj) == 'yes', "the grouper calls timeGroup() on objects" );
  });


  test(".bySlotGroup()", function() {
    var grouper = GroupSessions.bySlotGroup([]);
    var obj = { slotGroup: function() { return 'yes'; } };

    expect(1);
    ok( grouper(obj) == 'yes', "the grouper calls slotGroup() on objects" );
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
    ok( finder.byId('ses1').title == 'a', "finds session by id" );
    ok( finder.byId('none') == undefined, "returns undefined if not found" );
  });
});
