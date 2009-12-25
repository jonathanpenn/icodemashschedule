$(document).ready(function() {

  module("Utility methods");


  test("$.groupBy(array, function)", function() {
    var arr = ['ab', 'cc', 'ac', 'cd'];
    var grouped = $.groupBy(arr, function(item) {
      return item[0];
    });

    expect(4);
    ok( grouped['a'][0] == 'ab' );
    ok( grouped['a'][1] == 'ac' );
    ok( grouped['c'][0] == 'cc' );
    ok( grouped['c'][1] == 'cd' );
  });


  test("$.keys(hash)", function() {
    var keys = $.keys({a:1, b:2, c:3});
    expect(3);
    ok( keys[0] == 'a', "has first key" );
    ok( keys[1] == 'b', "has second key" );
    ok( keys[2] == 'c', "has third key" );
  });


  test("$.values(hash)", function() {
    var values = $.values({a:1, b:2, c:3});
    expect(3);
    ok( values[0] == 1, "has first value" );
    ok( values[1] == 2, "has second value" );
    ok( values[2] == 3, "has third value" );
  });


  test("domid(timestr)", function() {
    expect(3);
    ok( domid('2:00 am') == '200am' );
    ok( domid('Some') == 'some' );
    ok( domid('one', 'two') == 'one_two' );
  });

});
