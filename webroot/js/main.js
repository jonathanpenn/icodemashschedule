$.jQTouch({
  icon: 'img/icon.png',
  statusBar: 'black',
  startupScreen: 'img/splash.png',
  preloadImages: [
    'themes/jqt/img/chevron_white.png',
    'themes/jqt/img/bg_row_select.gif',
    'themes/jqt/img/back_button_clicked.png',
    'themes/jqt/img/button_clicked.png'
  ]
});

$(document).ready(function() {
  sessions = SortSessions.byStartTime(sessions);
  var sessionsByDay = GroupSessions.byDayGroup(sessions);

  var mainMenu = new MenuList();

  for(day in sessionsByDay) {
    var id = domid(day, "panel")
    mainMenu.items.push(
      new MenuListItem({title: day, panel: id})
    );

    renderSessionPanelForDay(id, day, sessionsByDay[day]);
  }

  $("#startingSchedule").replaceWith(mainMenu.$render());

  $("#loading").hide();
});


function renderSessionPanelForDay(day_id, day, sessions)
{
  var sessionsByTime = GroupSessions.byTimeGroup(sessions);

  var menu = new MenuList();

  for (time in sessionsByTime) {
    var id = domid(day, time);

    menu.items.push(
      new MenuListItem({
        title: time,
        panel: id
      })
    );

    renderSessionPanelForTime(id, day, time, sessionsByTime[time]);
  }

  var panel = new Panel({
    id: day_id,
    title: day,
    content: menu.$render()
  });

  $("body").append(panel.$render());
}


function renderSessionPanelForTime(panel_id, day, time, sessions)
{
  var menu = new MenuList();

  for (k in sessions) {
    menu.items.push(
      new MenuListItem({
        title: sessions[k].title,
        panel: sessions[k].id
      })
    );

    renderSessionPanel(sessions[k]);
  }

  var panel = new Panel({
    id: panel_id,
    title: day + " " + time,
    content: menu.$render()
  });

  $("body").append(panel.$render());
}


function renderSessionPanel(session)
{
  $("body").append(Panel.generateFromSession(session).$render());
}


$(document).ready(function() {

  var NEXT_SESSION_WINDOW = 10;   // minutes
  var now = new Date();
  var threshold = new Date(now.valueOf() - NEXT_SESSION_WINDOW * 60000);

  function showNextSessionSlot()
  {
    var slots = getSlots();
    var nextSlot = getNextSlot(slots);

    if (nextSlot) {
      $("#nextSession").html("\
        <li class='arrow'>\
          <a href='"+slotPanelId(nextSlot)+"'>"+slotDisplayName(nextSlot)+"</a>\
        </li>\
      ");
    } else {
      $("#nextSession").hide().prev().hide();
    }
  }

  function slotPanelId(slot)
  {
    return '#' + domid(formatting.weekday(slot), formatting.shortTime(slot));
  }

  function slotDisplayName(slot)
  {
    return formatting.weekday(slot) + " " + formatting.shortTime(slot);
  }

  function getSlots()
  {
    var sessionsBySlot = GroupSessions.bySlotGroup(sessions);
    var slots = [];
    for (slot in sessionsBySlot) {
      slots.push(slot-0);
    }
    return slots;
  }

  function getNextSlot(slots)
  {
    var next;

    $.each(slots, function(index, slot) {
      slot = new Date(slot-0);

      if (slot > threshold) {
        next = slot;
        return false;
      }
    });

    return next;
  }

  showNextSessionSlot();

});
