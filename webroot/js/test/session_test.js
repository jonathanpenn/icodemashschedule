$(document).ready(function() {

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


  module("Session", {setup:setup});


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


});



$(document).ready(function() {

  module("SortSessions");


  test(".byStartTime(sessions)", function() {
    var sessions = [
      {startTime: 1, title: 'a'},
      {startTime: 3, title: 'a'},
      {startTime: 2, title: 'b'},
      {startTime: 2, title: 'a'}
    ];

    sessions = SortSessions.byStartTime(sessions);
    expect(6);
    ok( sessions[0].startTime == 1);
    ok( sessions[1].startTime == 2);
    ok( sessions[1].title == 'a');
    ok( sessions[2].startTime == 2);
    ok( sessions[2].title == 'b');
    ok( sessions[3].startTime == 3);
  });

});



$(document).ready(function() {

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


  module("GroupSessions", {setup: setup, teardown: teardown});


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


});
