$(document).ready(function(){

  module("Favorites object");

  var session1 = {id: 'id1'};
  var session2 = {id: 'id2'};
  var session3 = {id: 'id3'};

  test("initialization", function() {
    var favs = new Favorites("id1,id2,id3");
    expect(3);
    ok( favs.hasSession(session1), "has the first session" );
    ok( favs.hasSession(session2), "has the second session" );
    ok( favs.hasSession(session3), "has the third session" );
  });

  test("initialization with no data", function() {
    var favs = new Favorites();
    expect(0);
  });

  test("addSession(session)", function() {
    var favs = new Favorites();
    favs.addSession(session3);
    expect(1);
    ok( favs.hasSession(session3), "adds the session to the end of the array" );
  });

  test("removeSession(session)", function() {
    var favs = new Favorites('id1,id2');
    expect(3);
    ok( favs.hasSession(session1), "starts out having session 1" );
    favs.removeSession(session1);
    ok( !favs.hasSession(session1), "no longer has session 1" );
    ok( favs.hasSession(session2), "still has session 2" );
  });

  test("hasSession(session)", function() {
    var favs = new Favorites('id1');
    expect(1);
    ok( favs.hasSession(session1), "knows if it has a session as favorite" );
  });

  test("toggleSession(session)", function() {
    var favs = new Favorites('id1,id2');
    expect(5);
    ok( favs.hasSession(session1), "starts out having session 1" );
    favs.toggleSession(session1);
    ok( !favs.hasSession(session1), "no longer has session 1" );
    ok( favs.hasSession(session2), "still has session 2" );
    favs.toggleSession(session1);
    ok( favs.hasSession(session1), "has session 1 after toggling" );
    ok( favs.hasSession(session2), "still has session 2" );
  });

  test("serialize()", function() {
    var favs = new Favorites();
    favs.addSession(session1);
    favs.addSession(session3);
    expect(1);
    ok( favs.serialize() == 'id1,id3', "serializes ids to comma separated string" );
  });

});
