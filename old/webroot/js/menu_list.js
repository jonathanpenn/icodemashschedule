function MenuList(initData)
{
  if (!initData) { initData = {}; }

  this.items = initData.items || [];


  this.$render = function()
  {
    var $ul = $("<ul class='rounded'></ul>");
    $.each(this.items, function(index, item) {
      $ul.append(item.$render());
    });

    return $ul;
  }

}


function MenuListItem(initData)
{
  if (!initData) { initData = {}; }

  this.title = initData.title;
  this.panel = initData.panel;
  this.htmlClasses = initData.htmlClasses;


  this.$render = function()
  {
    return $("\
      <li class='arrow'>\
        <a href='#"+this.panel+"' class='"+this.htmlClasses+"'>"+this.title+"</a>\
      </li>\
    ");
  }
}
