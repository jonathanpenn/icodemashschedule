$(document).ready(function() {

  var $mapPanel = $("#conferenceMap");
  var $back = $mapPanel.find("a.back");
  var leftDelta = 8, topDelta = 8;
  var positionTimer;

  $mapPanel.bind("pageAnimationStart", function(event, info) {
    if (info.direction == 'in') {
      scrolling();
    } else {
      clearTimeout(positionTimer);
      positionTimer = null;
    }
  });

  $back.css({
    opacity: '0.7'
  });


  function scrolling()
  {
    $back.stop().animate({
      top: $(document).scrollTop() + topDelta + "px",
      left: $(document).scrollLeft() + leftDelta + "px"
    }, 300);
    positionTimer = setTimeout(scrolling, 500);
  }


});
