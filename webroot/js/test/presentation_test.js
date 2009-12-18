$(document).ready(function() {

  module("Presentation");

  test("Object is defined", function() {
    expect(1);
    var presentation = new Presentation();
    ok( presentation != null, "presentation object exists" );
  });

});
