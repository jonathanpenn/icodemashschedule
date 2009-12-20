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
  loadAndInsertSchedulePanels();
  loadPresentationArray();

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

  createUpcomingMenuList();

  setTimeout(
    fixShallowMenuItemsIn(["ui", "thursday_panel", "friday_panel"]),
    10);

  $("#loading").hide();
});


function loadAndInsertSchedulePanels()
{
  var loader = new DataLoader();
  var schedule = loader.loadFrom("codemash.html");

  $("body").append(schedule);
}


function loadPresentationArray()
{
  $("body > div.session").each(function() {
    var presentation = new Presentation($(this));
    presentations.push(presentation);
    $(this).bind("pageAnimationStart", formatSessionDates).
      data("presentation", presentation);
  });

  presentations = SortPresentations.byStartTime(presentations);
}


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


function createUpcomingMenuList()
{
  var $nextSlot = getNextSlotForDay('Thursday').clone();
  $nextSlot.find("a").prepend("Thursday ");

  var list = new MenuList();

  var $list = list.$render();
  $list.append($nextSlot);

  $("#ui > .toolbar").
    after($list).
    after("<h2>Next Session</h2>");
}


function getNextSlotForDay(day)
{
  var $panel = $("#" + domid(day, 'panel'));
  return $panel.find("ul > li:nth(0)");
}


function fixShallowMenuItemsIn(panels)
{
  $.each(panels, function(index, panel_id) {
    $("#" + panel_id).find("> ul li").each(function() {
      var $firstLi = $(this);
      var href = $(this).find("> a").attr("href");
      var $current = $(href).find("> ul > li");
      if ($current.length == 1) {
        $firstLi.find("> a").attr("href", $current.find("a").attr("href"));
      }
    });
  });
}


function formatSessionDates(event, info)
{
  var shortTime = formatting.shortTime;
  var weekday = formatting.weekday;

  if (info['direction'] == 'in' && !$(this).data('alreadyFormatted')) {
    $(this).data('alreadyFormatted', true);
    var $meta = $(this).find("> .meta");
    var $startElm = $meta.find(".startTime");
    var presentation = $(this).data("presentation");
    $startElm.html("\
      "+weekday(presentation.startTime)+"\
      "+shortTime(presentation.startTime)+" - \
      "+shortTime(presentation.endTime)+"\
    ");
  }
}
