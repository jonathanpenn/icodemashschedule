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
  var sessionsByDay = GroupSessions.byDayGroup(sessions);

  var mainMenu = new MenuList();

  for(day in sessionsByDay) {
    mainMenu.items.push(
      new MenuListItem({title: day})
    );
  }

  $("#startingSchedule").replaceWith(mainMenu.$render());

  $("#loading").hide();
});
