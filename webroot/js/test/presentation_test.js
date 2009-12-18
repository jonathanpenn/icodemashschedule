$(document).ready(function() {

  var $element = $("\
    <div class='presentation'\
      room='A'\
      startTime='Wed Dec 31 1969 19:00:01 GMT-0500 (EST)'\
      endTime='Wed Dec 31 1969 20:00:01 GMT-0500 (EST)'>\
      <h2>Some Language Kicks Ass</h2>\
      <div class='description'>Some description</div>\
    </div>\
  ");
  var presentation;


  function setup()
  {
    presentation = new Presentation($element);
  }


  module("Presentation", {setup:setup});


  test("initialization with jQuery element", function() {
    expect(5);
    ok( presentation.room == "A", "has a presentation room" );
    ok( presentation.startTime.valueOf() == 1000,
      "it has a start time as a date object" );
    ok( presentation.endTime.valueOf() == 3601000,
      "it has a end time as a date object" );
    ok( presentation.title == 'Some Language Kicks Ass',
      "it has a title" );
    ok( presentation.description == 'Some description',
      "it has a description" );
  });

});
