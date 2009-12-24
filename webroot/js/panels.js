function Panel(initData)
{

  if (!initData) { initData = {}; }

  this.id = initData.id || Panel.generateId();
  this.title = initData.title;
  this.content = initData.content || '';
  this.backPanelId = initData.backPanelId || '';
  this.backButtonTitle = initData.backButtonTitle || 'Back';


  this.$render = function()
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


Panel.generateFromSession = function(session)
{
  var panel = new Panel({
    id: session.id,
    title: "Session"
  });

  var formattedTime = formatting.weekday(session.start) +
    " " + formatting.shortTime(session.start);

  panel.content = "\
    <div class='content'>\
      <h1>"+session.title+"</h1>\
      <div class='speaker'>"+session.speaker+"</div>\
      <div class='room'>"+session.room+"</div>\
      <div class='start'>"+formattedTime+"</div>\
      <div class='difficulty'>"+session.difficulty+"</div>\
      <div class='technology'>"+session.technology+"</div>\
      <div class='track'>"+session.track+"</div>\
      <div class='abstract'>"+session.abstract+"</div>\
    </div>\
  ";

  var old$render = panel.$render;

  panel.$render = function()
  {
    var $html = old$render.call(panel);
    $html.data('session', session);
    return $html;
  }

  return panel;
}
