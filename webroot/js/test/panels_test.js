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


  test(".render()", function() {
    var panel = new Panel({
      id: 'butter_id',
      title: 'Panel 1',
      content: '<div>Butterscotch</div>',
      backPanelId: 'panel_0',
      backButtonTitle: 'Go Back'
    });
    var $panel = panel.render();

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
    var $panel = panel.render();

    expect(1);
    ok( $panel.find('> div.toolbar').next().next().html() == "another",
      "it adds content at the end of the panel div" );
  });


});
