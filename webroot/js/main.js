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
  var sessionsByDays = GroupSessions.byDayGroup(sessions);

  var mainMenu = new MenuList({
    items: [
      new MenuListItem({ title: 'Wednesday (Precompiler)', panel: 'wednesday_panel' }),
      new MenuListItem({ title: 'Thursday', panel: 'thursday_panel' }),
      new MenuListItem({ title: 'Friday', panel: 'friday_panel' })
    ]
  });

  $("#startingSchedule").replaceWith(mainMenu.$render());

  $("#loading").hide();
});
