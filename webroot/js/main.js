$.jQTouch({
  icon: 'img/icon.png',
  statusBar: 'black',
  preloadImages: [
    'themes/jqt/img/chevron_white.png',
    'themes/jqt/img/bg_row_select.gif',
    'themes/jqt/img/back_button_clicked.png',
    'themes/jqt/img/button_clicked.png'
  ]
});

presentations = [];

$(document).ready(function() {
  var loader = new DataLoader();
  var schedule = loader.loadFrom("codemash.html");

  $("body").append(schedule);

  $("body > div._presentation").each(function() {
    var presentation = new Presentation($(this));
    presentations.push(presentation);
  });

  presentations = SortPresentations.byStartTime(presentations);

  var presByDays = GroupPresentations.byDayGroup(presentations);

  var mainMenu = new MenuList({
    items: [
      new MenuListItem({ title: 'Wednesday (Precompiler)', panel: 'wednesday_panel' }),
      new MenuListItem({ title: 'Thursday', panel: 'thursday_panel' }),
      new MenuListItem({ title: 'Friday', panel: 'friday_panel' })
    ]
  });

  $("#ui").append("<h2>2010 Schedule</h2>");
  $("#ui").append(mainMenu.$render());

  for (day in presByDays) {
    createPanelForDay(day, presByDays[day]);
  }

  $("#loading").hide();
});


function createPanelForDay(day, presentations)
{
  var $content = createDayTimeList(day, GroupPresentations.byTimeGroup(presentations));

  var dayPanel = new Panel({
    id: domid(day, 'panel'),
    title: day,
    content: $content.$render()
  });

  $("body").append(dayPanel.$render());
}


function createDayTimeList(day, presentations)
{
  var dayTimeList = new MenuList();

  for (time in presentations) {
    var id = domid(day, time);
    var item = new MenuListItem({ title: time, panel: id });
    dayTimeList.items.push(item);
    createPanelForTime(day, time, presentations[time]);
  }

  return dayTimeList;
}


function createPanelForTime(day, time, presentations)
{
  var $content = createPresentationList(day, time, presentations);

  var panel = new Panel({
    id: domid(day, time),
    title: day + " "  + time,
    content: $content.$render()
  });

  $("body").append(panel.$render());
}


function createPresentationList(day, time, presentations)
{
  var presList = new MenuList();

  $.each(presentations, function(index, pres) {
    var item = new MenuListItem({ panel: pres.id, title: pres.title });
    presList.items.push(item);
    pres.setBackButtonTitle(time);
  });

  return presList;
}
