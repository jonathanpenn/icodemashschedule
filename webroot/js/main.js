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
    console.log("here");
    var presentation = new Presentation($(this));
    presentations.push(presentation);
  });

  presentations.sort(PresentationSort.byStartTime);

  $.each(presentations, function(index, presentation) {
    $("#scheduleList").append("\
      <li class='arrow'>\
        <a href='#"+presentation.id+"'>"+presentation.title+"</a>\
      </li>\
    ");
  });

  $("#loading").hide();
});
