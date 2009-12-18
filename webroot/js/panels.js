function Panel(initData)
{

  if (initData) {
    this.id = initData.id;
    this.title = initData.title;
    this.content = initData.content;
  } else {
    this.id = 'panel_' + Panel.id_counter;
    Panel.id_counter++;
    this.title = "New Panel";
    this.content = "Content";
  }


  this.render = function()
  {
    return "\
      <div id='"+this.id+"'>\
        <div class='toolbar'>\
          <h1>"+this.title+"</h1>\
        </div>\
        "+this.content+"\
      </div>\
    ";
  }


}


Panel.id_counter = 1;
