$(document).ready(function() {

  var $element = $("\
    <div id='someid'>\
      <ul class='rounded'>\
        <li class='_title'>Title</li>\
        <li class='_location'>Location</li>\
        <li class='_startTime'>Fri, Dec 14, 2009 2:00 am EST</li>\
        <li class='_endTime'>Fri, Dec 14, 2009 3:00 am EST</li>\
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
    expect(6);
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
  });


  test(".dayGroup()", function() {
    expect(2);

    ok( presentation.dayGroup() == 'Monday' );
    presentation.startTime = new Date(Date.parse('Tue, Dec 15, 2009 3:00 am EST'));
    ok( presentation.dayGroup() == 'Tuesday' );
  });


  test(".timeGroup()", function() {
    expect(3);

    presentation.startTime = new Date(Date.parse('Tue, Dec 15, 2009 2:00 am EST'));
    ok( presentation.timeGroup() == '2:00 am' );
    presentation.startTime = new Date(Date.parse('Tue, Dec 15, 2009 3:00 pm EST'));
    ok( presentation.timeGroup() == '3:00 pm' );
    presentation.startTime = new Date(Date.parse('Tue, Dec 15, 2009 12:00 pm EST'));
    ok( presentation.timeGroup() == '12:00 pm' );
  });

});



$(document).ready(function() {

  module("PresentationSort");


  test("byStartTime", function() {
    var presentations = [
      {startTime: 1, title: 'a'},
      {startTime: 3, title: 'a'},
      {startTime: 2, title: 'b'},
      {startTime: 2, title: 'a'}
    ];

    presentations.sort(PresentationSort.byStartTime);
    expect(6);
    ok( presentations[0].startTime == 1);
    ok( presentations[1].startTime == 2);
    ok( presentations[1].title == 'a');
    ok( presentations[2].startTime == 2);
    ok( presentations[2].title == 'b');
    ok( presentations[3].startTime == 3);
  });

});
