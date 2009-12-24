$(document).ready(function() {

  module("Panel object");


  test("initialization", function() {
    Panel.id_counter = 1;

    var panel = new Panel();
    expect(4);

    ok( panel.id == 'panel_1', "defaults panel id" );
    ok( (new Panel()).id == "panel_2", "increments the panel id counter" );
    ok( panel.backPanelId == '', "back button just goes back to previous id" );
    ok( panel.backButtonTitle == 'Back', "back button title" );
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
    ok( panel.id == 'new_id', "initializes the id" );
    ok( panel.title == 'Panel 1', "initializes the title" );
    ok( panel.content == 'Butterscotch', "initializes the content" );
    ok( panel.backPanelId == 'panel_0', "initializes the back panel id" );
    ok( panel.backButtonTitle == 'Go Back', "initializes back button title" );
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
    ok( $panel.attr('id') == 'butter_id', "sets the dom id for the panel" );
    ok( $panel.find('> div.toolbar > h1').text() == 'Panel 1',
      "has h1 for title inside a toolbar div" );
    ok( $panel.find("> div.toolbar").next().html() == "Butterscotch",
      "appends content after toolbar" );
    ok( $panel.find("> div.toolbar > a.back").attr('href') == "#panel_0",
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
    ok( $panel.find('> div.toolbar').next().next().html() == "another",
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

    expect(13);
    ok( $html.attr("id") == session.id, "sets session id" );
    ok( $html.hasClass("session"), "panel has class 'session'" );
    ok( $html.find(".toolbar h1").html() == 'Session',
      "Sets the panel title to 'Session'" );
    ok( $html.find(".toolbar + .content").length == 1,
      "adds a content element after the toolbar" );
    ok( $html.find(".content > h1").html() == 'Some Session',
      "has the title" );
    ok( $html.find(".content > div.speaker").html() == 'Johnny Fedora',
      "has the speaker name" );
    ok( $html.find(".content > div.room").html() == 'Bathroom',
      "has the room" );
    ok( $html.find(".content > div.start").html() == 'Wednesday 7:00 pm',
      "has the start time" );
    ok( $html.find(".content > div.difficulty").html() == 'Beginner',
      "has the difficulty" );
    ok( $html.find(".content > div.technology").html() == 'Java',
      "has the technology" );
    ok( $html.find(".content > div.track").html() == 'Web Frameworks',
      "has the track" );
    ok( $html.find(".content > div.abstract").html() == "We'll Learn Stuff",
      "has the abstract" );
    ok( $html.data("session") == session, "it stores the session as data" );
  });

});
