$(document).ready(function() {


  module("Utility methods");


  test("Array.groupBy(function)", function() {
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


  test("domid(timestr)", function() {
    expect(3);
    ok( domid('2:00 am') == '200am' );
    ok( domid('Some') == 'some' );
    ok( domid('one', 'two') == 'one_two' );
  });


});
