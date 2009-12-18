
$(document).ready(function() {

  $("#canvas").append("<div id='schedule'></div>");

  $.each(presentations, function(index, presentation) {
    $("#schedule").append("\
      <li>"+presentation.title+"</li>\
    ");
  });

  $("#loading").hide();
});
