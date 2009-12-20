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
      new MenuListItem({ title: 'Thursday', panel: 'thursday_panel' }),
      new MenuListItem({ title: 'Friday', panel: 'friday_panel' })
    ]
  });

  $("#ui").append(mainMenu.$render());

  for (day in presByDays) {
    var presByTime = GroupPresentations.byTimeGroup(presByDays[day]);
    var dayTimeList = new MenuList();

    for (time in presByTime) {
      id = domid(day, time);
      var item = new MenuListItem({
        title: time,
        panel: id
      });
      dayTimeList.items.push(item);

      var presList = new MenuList();

      $.each(presByTime[time], function(index, pres) {
        var item = new MenuListItem({
          panel: pres.id,
          title: pres.title
        });
        presList.items.push(item);
        pres.setBackButtonTitle(time);
      });

      var panel = new Panel({
        id: id,
        title: day + " "  + time,
        content: presList.$render()
      });

      $("body").append(panel.$render());
    }

    var dayPanel = new Panel({
      id: domid(day, 'panel'),
      title: day,
      content: dayTimeList.$render()
    });
    $("body").append(dayPanel.$render());
  }

  $("#loading").hide();
});
