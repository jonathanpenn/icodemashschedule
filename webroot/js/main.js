
$(document).ready(function() {

  $("#canvas").append("<div id='schedule'></div>");

  presentations.sort(function(a,b) {
    return a.startTime > b.startTime ? 1 : -1;
  });

  $.each(presentations, function(index, presentation) {
    $("#schedule").append("\
      <li>"+presentation.title+" ("+presentation.location+")</li>\
    ");
  });

  $("#loading").hide();
});
