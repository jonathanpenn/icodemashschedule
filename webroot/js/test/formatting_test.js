$(document).ready(function() {

  module("formatting helpers");


  test("shortTime(time)", function() {
    var shortTime = formatting.shortTime;

    expect(3);
    time = new Date(Date.parse('Tue, Dec 15, 2009 2:00 am EST'));
    ok( shortTime(time) == '2:00 am', "displays 2:00 am" );
    time = new Date(Date.parse('Tue, Dec 15, 2009 3:00 pm EST'));
    ok( shortTime(time) == '3:00 pm', "displays 3:00 pm" );
    time = new Date(Date.parse('Tue, Dec 15, 2009 12:00 pm EST'));
    ok( shortTime(time) == '12:00 pm', "displays 12:00 pm" );
  });


  test("weekday(time)", function() {
    var weekday = formatting.weekday;

    expect(2);
    var time = new Date(Date.parse("Fri, Dec 14, 2009 2:00 am EST"));
    ok( weekday(time) == 'Monday' );
    time = new Date(Date.parse('Tue, Dec 15, 2009 3:00 am EST'));
    ok( weekday(time) == 'Tuesday' );
  });


});
