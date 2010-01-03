$(document).ready(function() {

  test("$RenderTimeSlot(slot)", function() {
    var slot = new Date(Date.parse("12/22/2009 7:54 am"));
    var $html = $RenderTimeSlot(slot);

    expect(4);
    equals( $html[0].tagName, 'LI', "it renders as an LI tag" );
    ok( $html.hasClass('arrow'), "it has the class .arrow" );
    equals( $html.find("> a").html(), "Tuesday 7:54 am",
      "it renders the slot display name in a link" );
    equals( $html.find("> a").attr('href'), '#tuesday_754am',
      "it renders the correct href" );
  });

});


$(document).ready(function() {

  module("NextSlotFinder object", {setup:setup});

  var sessions = [
    { start: new Date(Date.parse("12/22/2009 7:34 am")) },
    { start: new Date(Date.parse("12/22/2009 7:34 am")) },
    { start: new Date(Date.parse("12/22/2009 8:34 am")) },
    { start: new Date(Date.parse("12/22/2009 8:34 am")) }
  ];

  var finder;

  function setup()
  {
    finder = new NextSlotFinder(sessions);
  }


  test("nextSince(date)", function() {
    var date = new Date(Date.parse("12/22/2009 7:45 am"));
    var next = finder.nextSince(date);

    expect(1);
    equals( next.valueOf(), Date.parse("12/22/2009 8:34 am"),
      "returns time of next group of sessions since date" );
  });


  test("threshold()", function() {
    var now = new Date(Date.parse("12/22/2009 7:54 am"));
    var thres = finder.threshold(now);
    equals( thres, now.valueOf() - (finder.NEXT_SESSION_WINDOW * 60000),
      "calculates threshold from this.now" );
  });

});

