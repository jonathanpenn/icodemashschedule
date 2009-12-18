$(document).ready(function() {

  module("Dataloader");

  test("loadFrom", function() {
    var loader = new DataLoader();
    var html = loader.loadFrom("codemash.html");

    expect(2);
    ok( html, "result should be defined" );
    ok( $(html).find("h2").length > 0, "finds html data in the result" );
  });


  test("loadWithCache", function() {
    var loader = new DataLoader();
    var html;

    expect(2);
    loader.loadFrom = function(){ return 'call me'; }
    html = loader.loadWithCache("smug");
    ok( html == 'call me', "calls loadFrom the first time around" );

    loader.loadFrom = function(){ return 'different result'; }
    html = loader.loadWithCache("smug");
    ok( html == 'call me', "caches the result" );
  });

});
