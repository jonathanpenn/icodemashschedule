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

  test("ids()", function() {
    var favs = new Favorites('id1,id2');
    expect(2);
    ok( favs.ids()[0] == 'id1', "has first id" );
    ok( favs.ids()[1] == 'id2', "has second id" );
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


$(document).ready(function(){

  module("FavoritesList object", {setup:setup});

  var sessions = [
    new Session({id:"s1",title:"Session 1",start:new Date(1261334700000)}),
    new Session({id:"s2",title:"Session 2",start:new Date(1261334700000)}),
    new Session({id:"s3",title:"Session 3",start:new Date(1261341900000)}),
    new Session({id:"s4",title:"Session 4",start:new Date(1261341900000)})
  ];

  var favorites = new Favorites('s1,s2,s3');

  var favlist;

  function setup()
  {
    favlist = new FavoritesList(sessions, favorites);
  }


  test("$render()", function() {
    var $next, $html = favlist.$render();

    var $next = $html.eq(0);
    ok( $next[0].tagName == 'H2', "renders group title as h2 tag" );
    ok( $next.html() == 'Sunday 1:45 pm',
      "renders first day/time as group title" );

    $next = $next.next();
    ok( $next[0].tagName == 'UL', "followed by an unordered list" );
    ok( $next.hasClass('rounded'), "that has the class .rounded" );
    ok( $next.find("> li:first-child").hasClass('arrow'),
      "and the first list item has the class .arrow" );
    ok( $next.find("> li:first-child a").html() == 'Session 1',
      "and has an A tag with session 1 title" );
    ok( $next.find("> li:first-child a").attr('href') == '#s1',
      "and the a tag has href to #s1" );

    ok( $next.find("> li:nth(1)").hasClass('arrow'),
      "and the second list item has the class .arrow" );
    ok( $next.find("> li:nth(1) a").html() == 'Session 2',
      "and has an A tag with session 1 title" );
    ok( $next.find("> li:nth(1) a").attr('href') == '#s2',
      "and the a tag has href to #s1" );

    $next = $next.next();
    ok( $next[0].tagName == 'H2', "renders group title as h2 tag" );
    ok( $next.html() == 'Sunday 3:45 pm',
      "renders first day/time as group title" );

    $next = $next.next();
    ok( $next[0].tagName == 'UL', "followed by an unordered list" );
    ok( $next.hasClass('rounded'), "that has the class .rounded" );
    ok( $next.find("> li:first-child").hasClass('arrow'),
      "and the first list item has the class .arrow" );
    ok( $next.find("> li:first-child a").html() == 'Session 3',
      "and has an A tag with session 3 title" );
    ok( $next.find("> li:first-child a").attr('href') == '#s3',
      "and the a tag has href to #s3" );

    $next = $next.next();
    ok( $next.length == 0, "should be no more elements" );
  });

});
