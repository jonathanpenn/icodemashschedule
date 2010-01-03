$(document).ready(function() {

  module("Utility methods");


  test("$.groupBy(array, function)", function() {
    var arr = ['ab', 'cc', 'ac', 'cd'];
    var grouped = $.groupBy(arr, function(item) {
      return item[0];
    });

    expect(4);
    equals( grouped['a'][0], 'ab' );
    equals( grouped['a'][1], 'ac' );
    equals( grouped['c'][0], 'cc' );
    equals( grouped['c'][1], 'cd' );
  });


  test("$.keys(hash)", function() {
    var keys = $.keys({a:1, b:2, c:3});
    expect(3);
    equals( keys[0], 'a', "has first key" );
    equals( keys[1], 'b', "has second key" );
    equals( keys[2], 'c', "has third key" );
  });


  test("$.values(hash)", function() {
    var values = $.values({a:1, b:2, c:3});
    expect(3);
    equals( values[0], 1, "has first value" );
    equals( values[1], 2, "has second value" );
    equals( values[2], 3, "has third value" );
  });


  test("domid(timestr)", function() {
    expect(3);
    equals( domid('2:00 am'), '200am' );
    equals( domid('Some'), 'some' );
    equals( domid('one', 'two'), 'one_two' );
  });

});
