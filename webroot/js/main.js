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

      var $div = $("\
        <div id='"+id+"'>\
          <div class='toolbar'>\
            <h1>"+day+" "+time+"</h1>\
            <a class='back' href='#'>Back</a>\
          </div>\
          <ul class='rounded'></ul>\
        </div>\
      ");
      var $ul = $div.find("ul");

      $.each(presByTime[time], function(index, pres) {
        $ul.append("\
          <li class='arrow'><a href='#"+pres.id+"'>"+pres.title+"</a></li>\
        ");
      });

      $("body").append($div);
    }
  }

  $("#loading").hide();
});
