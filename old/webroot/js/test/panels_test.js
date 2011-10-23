$(document).ready(function() {

  module("Panel object");


  test("initialization", function() {
    Panel.id_counter = 1;

    var panel = new Panel();
    expect(4);

    equals( panel.id, 'panel_1', "defaults panel id" );
    equals( (new Panel()).id, "panel_2", "increments the panel id counter" );
    equals( panel.backPanelId, '', "back button just goes back to previous id" );
    equals( panel.backButtonTitle, 'Back', "back button title" );
  });


  test("initialization with data", function() {
    var panel = new Panel({
      id: 'new_id',
      title: 'Panel 1',
      content: 'Butterscotch',
      backPanelId: 'panel_0',
      backButtonTitle: 'Go Back'
    });

    expect(5);
    equals( panel.id, 'new_id', "initializes the id" );
    equals( panel.title, 'Panel 1', "initializes the title" );
    equals( panel.content, 'Butterscotch', "initializes the content" );
    equals( panel.backPanelId, 'panel_0', "initializes the back panel id" );
    equals( panel.backButtonTitle, 'Go Back', "initializes back button title" );
  });


  test(".$render()", function() {
    var panel = new Panel({
      id: 'butter_id',
      title: 'Panel 1',
      content: '<div>Butterscotch</div>',
      backPanelId: 'panel_0',
      backButtonTitle: 'Go Back'
    });
    var $panel = panel.$render();

    expect(5);
    equals( $panel.attr('id'), 'butter_id', "sets the dom id for the panel" );
    equals( $panel.find('> div.toolbar > h1').text(), 'Panel 1',
      "has h1 for title inside a toolbar div" );
    equals( $panel.find("> div.toolbar").next().html(), "Butterscotch",
      "appends content after toolbar" );
    equals( $panel.find("> div.toolbar > a.back").attr('href'), "#panel_0",
      "href for back button is the back panel id" );
    ok( $panel.find("> div.toolbar > a.back").text().indexOf("Go Back") >= 0,
      "title of backbutton is set" );
  });


  test(".appendContent(content)", function() {
    var panel = new Panel({
      id: 'butter_id',
      title: 'Panel 1',
      content: '<div>Butterscotch</div>'
    });

    panel.appendContent("<div>another</div>");
    var $panel = panel.$render();

    expect(1);
    equals( $panel.find('> div.toolbar').next().next().html(), "another",
      "it adds content at the end of the panel div" );
  });


});


$(document).ready(function() {

  module("Panel.generateFromSession(session)", {setup:setup});

  var session, panel;

  function setup()
  {
    session = new Session({
      id:"session_1",
      title:"Some Session",
      speaker:"Johnny Fedora",
      room:"Bathroom",
      start: new Date(43215),
      difficulty:"Beginner",
      technology:"Java",
      track:"Web Frameworks",
      abstract:"We'll Learn Stuff"
    });

    panel = Panel.generateFromSession(session);
  }

  test("renders expected html", function() {
    var $html = panel.$render();

    expect(14);
    equals( $html.attr("id"), session.id, "sets session id" );
    ok( $html.hasClass("session"), "panel has class 'session'" );
    equals( $html.find(".toolbar h1").html(), 'Session',
      "Sets the panel title to 'Session'" );
    equals( $html.find(".toolbar + ul a.room[href=#conferenceMap]").html(),
      "Room: Bathroom", "adds a link to the conference map" );
    equals( $html.find(".toolbar + ul a.room[href=#conferenceMap]").attr('data-room'),
      "Bathroom", "link has session room as data attribute" );
    equals( $html.find(".toolbar + ul + .content").length, 1,
      "adds the content after the map link" );
    equals( $html.find(".content > h1").html(), 'Some Session',
      "has the title" );
    equals( $html.find(".content > div.speaker").html(), 'Johnny Fedora',
      "has the speaker name" );
    equals( $html.find(".content > div.start").html(), 'Wednesday 7:00 pm',
      "has the start time" );
    equals( $html.find(".content > div.difficulty").html(), 'Beginner',
      "has the difficulty" );
    equals( $html.find(".content > div.technology").html(), 'Java',
      "has the technology" );
    equals( $html.find(".content > div.track").html(), 'Web Frameworks',
      "has the track" );
    equals( $html.find(".content > div.abstract").html(), "We'll Learn Stuff",
      "has the abstract" );
    equals( $html.data("session"), session, "it stores the session as data" );
  });

});
