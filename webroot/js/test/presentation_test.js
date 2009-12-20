$(document).ready(function() {

  var $element = $("\
    <div id='someid'>\
      <div class='toolbar'>\
        <a class='back' href='#'>Back</a>\
      </div>\
      <div class='meta'>\
        <h1 class='title'>Title</h1>\
        <div class='location'>Location</div>\
        <div class='startTime'>Fri, Dec 14, 2009 2:00 am EST</div>\
        <div class='endTime'>Fri, Dec 14, 2009 3:00 am EST</div>\
      </ul>\
      <div class='description'>Description</div>\
    </div>\
  ");
  var presentation;


  function setup()
  {
    presentation = new Presentation($element);
  }


  module("Presentation", {setup:setup});


  test("initialization with jQuery element", function() {
    expect(7);
    ok( presentation.id == 'someid', "it has the presentation id" );
    ok( presentation.title == 'Title', "it has a title" );
    ok( presentation.location == "Location", "has a presentation location" );
    ok( presentation.description == 'Description', "it has a description" );
    ok( presentation.startTime.valueOf() ==
      Date.parse("Mon, Dec 14, 2009 2:00 am EST").valueOf(),
      "it has a start time as a date object" );
    ok( presentation.endTime.valueOf() ==
      Date.parse("Mon, Dec 14, 2009 3:00 am EST").valueOf(),
      "it has a end time as a date object" );
    ok( presentation.$element == $element,
      "it keeps track of the element initialized" );
  });


  test(".dayGroup()", function() {
    expect(1);
    ok( presentation.dayGroup() == 'Monday' );
  });


  test(".timeGroup()", function() {
    expect(1);
    ok( presentation.timeGroup() == '2:00 am' );
  });


  test(".setBackButtonTitle(title)", function() {
    presentation.setBackButtonTitle('new one');
    expect(1);
    ok( presentation.$element.find("a.back").html() == 'new one',
      "exchanges the old back button title for a new one" );
  });


  test(".setBackButtonPanel(panel_id)", function() {
    presentation.setBackButtonPanel('some_other_id');
    expect(1);
    ok( presentation.$element.find("a.back").attr('href') == '#some_other_id',
      "sets back href to the new panel id" );
  });

});



$(document).ready(function() {

  module("SortPresentations");


  test(".byStartTime(presentations)", function() {
    var presentations = [
      {startTime: 1, title: 'a'},
      {startTime: 3, title: 'a'},
      {startTime: 2, title: 'b'},
      {startTime: 2, title: 'a'}
    ];

    presentations = SortPresentations.byStartTime(presentations);
    expect(6);
    ok( presentations[0].startTime == 1);
    ok( presentations[1].startTime == 2);
    ok( presentations[1].title == 'a');
    ok( presentations[2].startTime == 2);
    ok( presentations[2].title == 'b');
    ok( presentations[3].startTime == 3);
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


  module("GroupPresentations", {setup: setup, teardown: teardown});


  test(".byDayGroup()", function() {
    var grouper = GroupPresentations.byDayGroup([]);
    var obj = { dayGroup: function() { return 'yes'; } };

    expect(1);
    ok( grouper(obj) == 'yes', "the grouper calls dayGroup() on objects" );
  });


  test(".byTimeGroup()", function() {
    var grouper = GroupPresentations.byTimeGroup([]);
    var obj = { timeGroup: function() { return 'yes'; } };

    expect(1);
    ok( grouper(obj) == 'yes', "the grouper calls timeGroup() on objects" );
  });


});
