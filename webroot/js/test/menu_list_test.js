$(document).ready(function() {


  module("MenuList");


  test("initialiation", function() {
    var menu = new MenuList({
    });

    expect(1);
    ok( menu, "menu object exists" );
  });



});


$(document).ready(function() {


  module("MenuListItem");


  test("initialization", function() {
    var item = new MenuListItem({
      title: "title to click",
      panelId: "go_here"
    });

    expect(2);
    ok( item.title == 'title to click', "has the title" );
    ok( item.panelId == 'go_here', "has the panel id" );
  });

});
