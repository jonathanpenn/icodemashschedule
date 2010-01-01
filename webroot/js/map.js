$(document).ready(function() {

  var $mapPanel = $("#conferenceMap");
  var $back = $mapPanel.find("a.back");
  var leftDelta = 8, topDelta = 8;
  var positionTimer;
  var lastX, lastY;
  var buttonOpacity = '0.9';

  $mapPanel.bind("pageAnimationStart", function(event, info) {
    if (info.direction == 'in') {
      lastX = lastY = null;
      $back.css({ opacity: '0' });
      $mapPanel.css({ opacity: '0' });
    } else {
      $mapPanel.css({ opacity: '0' });
      clearTimeout(positionTimer);
      positionTimer = null;
    }
  }).bind("pageAnimationEnd", function(event, info) {
    if (info.direction == 'in') {
      scrolling();
    }
  });

  function scrolling()
  {
    positionTimer = setTimeout(scrolling, 200);

    var nowY = $(document).scrollTop();
    var nowX = $(document).scrollLeft();

    if (nowY == lastY && nowX == lastX) { return; }

    lastY = nowY;
    lastX = nowX;

    $back.stop().css({
      top: nowY + topDelta + "px",
      left: nowX + leftDelta + "px",
      opacity: '0'
    }).animate({ opacity: buttonOpacity }, 800);
  }


  $mapPanel.bind('mousedown', function(event) {
    $("#coords").html(event.clientX + ", " + event.clientY).css({
      top: lastY + topDelta + 30 + "px",
      left: lastX + leftDelta + "px"
    });
  }).append('<div id="coords"></div>').find("#coords").css({
    position: 'absolute',
    color: 'red'
  });

});


$(document).bind('sessions.loaded', function() {

  var mapCoordinates = {
    'Portia/Wisteria': [359, 459],
    'Cypress': [762, 256],
    'D': [613, 306],
    'E': [619, 216],
    'Mangrove': [407, 561],
    'Indigo Bay': [242, 256],
    'Guava/Tamarind': [462, 460]
  };

  var $mapPanel = $("#conferenceMap");
  $mapPanel.bind("pageAnimationEnd", function(event, info) {
    if (info.direction != 'in') { return; }

    var scrollMapTo = $mapPanel.data('referrer').text();

    var coords = mapCoordinates[scrollMapTo];
    if (!coords) { coords = [0, 0]; }
    else { coords = adjustCoordsForViewPort(coords); }

    var x = coords[0]-0;
    var y = coords[1]-0;

    setTimeout(function() {
      $mapPanel.animate({ opacity: '1' });
      scrollTo(x, y);
    }, 200);
  });


  function adjustCoordsForViewPort(coords)
  {
    var viewPortWidth = $(window).width();
    var viewPortHeight = $(window).height();

    coords = [
      coords[0] - viewPortWidth/2,
      coords[1] - viewPortHeight/2
    ];
    return coords;
  }
});
