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

$(document).ready(function() {

  $("#canvas").append("<div id='schedule'></div>");

  presentations.sort(function(a,b) {
    return a.startTime > b.startTime ? 1 : -1;
  });

  $.each(presentations, function(index, presentation) {
    $("#scheduleList").append("\
      <li class='arrow'>\
        <a href='#"+presentation.id+"'>"+presentation.title+" ("+presentation.location+")</a>\
      </li>\
    ");

    $("body").append("\
      <div id='"+presentation.id+"'>\
        <div class='toolbar'>\
          <h1>Presentation</h1>\
          <a href='#' class='back'>Back</a>\
        </div>\
        "+presentation.description+"\
      </div>\
    ");
  });

  $("#loading").hide();
});
