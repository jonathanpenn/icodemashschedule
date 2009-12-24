$(document).ready(function() {

  var sessions = [
    { start: new Date(Date.parse("12/22/2009 7:34 am")) },
    { start: new Date(Date.parse("12/22/2009 7:34 am")) },
    { start: new Date(Date.parse("12/22/2009 8:34 am")) },
    { start: new Date(Date.parse("12/22/2009 8:34 am")) }
  ];

  module("NextSlot object");


  test("threshold()", function() {
    var next = new NextSlot(sessions);
    var now = new Date(Date.parse("12/22/2009 7:54 am"));
    var thres = next.threshold(now);
    ok( thres == now.valueOf() - (next.NEXT_SESSION_WINDOW * 60000),
      "calculates threshold from this.now" );
  });


  test("$renderSince(date)", function() {
    var since = new Date(Date.parse("12/22/2009 7:54 am"));
    var next = new NextSlot(sessions);
    var $html = next.$renderSince(since);

    expect(4);
    ok( $html[0].tagName == 'LI', "it renders as an LI tag" );
    ok( $html.hasClass('arrow'), "it has the class .arrow" );
    ok( $html.find("> a").html() == "Tuesday 8:34 am",
      "it renders the slot display name in a link" );
    ok( $html.find("> a").attr('href') == '#tuesday_834am',
      "it renders the correct href" );
  });


  test("$renderSince(date) when there is no next session", function() {
    var since = new Date(Date.parse("12/22/2009 9:54 am"));
    var next = new NextSlot(sessions);
    var $html = next.$renderSince(since);

    expect(1);
    ok( !$html, "it returns false" );
  });


});
