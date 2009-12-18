$(document).ready(function() {


  module("Panel object");


  test("initialization", function() {
    Panel.id_counter = 1;

    var panel = new Panel();
    expect(4);

    ok( panel.id == 'panel_1', "defaults panel id" );
    ok( panel.title == 'New Panel', "defaults title" );
    ok( panel.content == 'Content', "defaults content" );
    ok( (new Panel()).id == "panel_2", "increments the panel id counter" );
  });


  test("initialization with data", function() {
    var panel = new Panel({
      id: 'new_id',
      title: 'Panel 1',
      content: 'Butterscotch'
    });

    expect(3);
    ok( panel.id == 'new_id', "initializes the id" );
    ok( panel.title == 'Panel 1', "initializes the title" );
    ok( panel.content == 'Butterscotch', "initializes the content" );
  });


  test(".render()", function() {
    var panel = new Panel({
      id: 'butter_id',
      title: 'Panel 1',
      content: '<div>Butterscotch</div>'
    });
    var $panel = $(panel.render());

    expect(3);
    ok( $panel.attr('id') == 'butter_id', "sets the dom id for the panel" );
    ok( $panel.find('> div.toolbar > h1').text() == 'Panel 1',
      "has h1 for title inside a toolbar div" );
    ok( $panel.find("> div.toolbar").next().html() == "Butterscotch",
      "appends content after toolbar" );
  });


});
