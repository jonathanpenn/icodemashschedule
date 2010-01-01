$(document).ready(function() {

  var $mapPanel = $("#conferenceMap");
  var $toolbar = $mapPanel.find(".toolbar");
  var positionTimer;
  var lastX, lastY;
  var buttonOpacity = '0.9';

  $mapPanel.bind("pageAnimationStart", function(event, info) {
    if (info.direction == 'in') {
      lastX = lastY = null;
      $toolbar.css({ opacity: '0' });
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

    $toolbar.stop().css({
      top: nowY + "px",
      left: nowX + "px",
      opacity: '0'
    }).animate({ opacity: buttonOpacity }, 300);
  }


  $mapPanel.bind('mousedown', function(event) {
    $("#coords").html(event.clientX + ", " + event.clientY).css({
      top: lastY + 40 + "px",
      left: lastX + "px"
    });
  }).append('<div id="coords"></div>').find("#coords").css({
    position: 'absolute',
    color: 'red'
  });

});


$(document).bind('sessions.loaded', function() {

  var mapCoordinates = {
    'Portia/Wisteria': [359, 501],
    'Cypress': [762, 304],
    'D': [613, 353],
    'E': [619, 266],
    'Mangrove': [407, 598],
    'Indigo Bay': [242, 299],
    'Guava/Tamarind': [462, 504]
  };

  var $mapPanel = $("#conferenceMap");
  $mapPanel.bind("pageAnimationEnd", function(event, info) {
    if (info.direction != 'in') { return; }

    var scrollMapTo = $mapPanel.data('referrer').text();
    $mapPanel.find("h1").html(scrollMapTo);

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
