$(document).ready(function() {


  module("Utility methods");


  test("Array.groupBy(function)", function() {
    var arr = ['ab', 'cc', 'ac', 'cd'];
    var grouped = arr.groupBy(function(item) {
      return item[0];
    });

    expect(4);
    ok( grouped['a'][0] == 'ab' );
    ok( grouped['a'][1] == 'ac' );
    ok( grouped['c'][0] == 'cc' );
    ok( grouped['c'][1] == 'cd' );
  });


});
