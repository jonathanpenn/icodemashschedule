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

  for (day in presByDays) {
    $("#timeList").append("<li class='sep'>"+day+"</li>");

    var presByTime = GroupPresentations.byTimeGroup(presByDays[day]);

    for (time in presByTime) {
      var id = domid(day, time);
      $("#timeList").append("\
        <li class='arrow'>\
          <a href='#"+id+"'>"+time+" &gt; </a>\
        </li>\
      ");

      var list = new MenuList();

      $.each(presByTime[time], function(index, pres) {
        var item = new MenuListItem({
          panel: pres.id,
          title: pres.title
        });
        list.items.push(item);
        pres.setBackButtonTitle(time);
      });

      var panel = new Panel({
        id: id,
        title: day + " "  + time,
        content: list.$render()
      });

      $("body").append(panel.render());
    }
  }

  $("#loading").hide();
});
