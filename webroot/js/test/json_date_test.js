$(document).ready(function() {

  module("Date.parseJSONDate(json)");

  test("it can recognize ISO date strings", function() {
    var str = "2009-12-15T14:40:52Z";
    var obj = Date.parseJSONDate(str);

    expect(2);
    ok( obj.valueOf() == 1260888052000,
      "expected 1260888052000 but got " + obj.valueOf() );

    var d = new Date();
    ok( d == Date.parseJSONDate(d),
      "it doesn't touch other objects" );
  });

});
