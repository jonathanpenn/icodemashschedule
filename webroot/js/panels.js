function Panel(initData)
{

  if (!initData) { initData = {}; }

  this.id = initData.id || Panel.generateId();
  this.title = initData.title;
  this.content = initData.content || '';
  this.backPanelId = initData.backPanelId || '';
  this.backButtonTitle = initData.backButtonTitle || 'Back';


  this.render = function()
  {
    var $html = $("\
      <div id='"+this.id+"'>\
        <div class='toolbar'>\
          <a class='back' href='#"+this.backPanelId+"'>\
            "+this.backButtonTitle+"\
          </a>\
          <h1>"+this.title+"</h1>\
        </div>\
      </div>\
    ");

    $html.append(this.content);

    return $html;
  }


  this.appendContent = function(content)
  {
    this.content += content;
  }


}


Panel.id_counter = 1;


Panel.generateId = function()
{
  return "panel_" + Panel.id_counter++;
}
