$(document).ready(function() {

  var mapCoordinates = {
    'Portia/Wisteria':  {x:355, y:452},
    'Guava/Tamarind':   {x:452, y:452},
    'Cypress':          {x:759, y:283},
    'A':                {x:382, y:327},
    'B':                {x:450, y:327},
    'C':                {x:540, y:327},
    'D':                {x:610, y:327},
    'E':                {x:610, y:241},
    'F':                {x:540, y:241},
    'G':                {x:450, y:241},
    'H':                {x:382, y:241},
    'Mangrove':         {x:405, y:573},
    'Indigo Bay':       {x:238, y:278},
    'Banyan':           {x:168, y:364},
    'Ironwood':         {x:172, y:438},
    'Crown Palm':       {x:125, y:498}
  };

  var $mapPanel = $("#conferenceMap");
  var $backButton = $mapPanel.find("a.back");
  var $dot = $mapPanel.find('img.dot');
  var positionTimer;
  var lastX = 0, lastY = 0;
  var buttonOpacity = 0.9;

  $dot.hide();

  $mapPanel.bind("pageAnimationStart", function(event, info) {
    if (info.direction == 'in') {
      $backButton.css({ opacity: 0 });
      $mapPanel.css({ opacity: 0 });
    } else {
      $mapPanel.css({ opacity: 0 });
      clearTimeout(positionTimer);
      positionTimer = null;
    }
  }).bind("pageAnimationEnd", function(event, info) {
    if (info.direction == 'in') {
      $backButton.css({ opacity: buttonOpacity });
      scrollTo(lastX, lastY);
      scrolling();
    }
  });

  function positionDot(x, y)
  {
    $dot.show().css({ left: x, top: y });
  }

  function scrolling()
  {
    positionTimer = setTimeout(scrolling, 100);

    var nowY = $(document).scrollTop();
    var nowX = $(document).scrollLeft();

    if (nowY != lastY || nowX != lastX) {
      lastY = nowY;
      lastX = nowX;
      repositionToolBar();
    }
  }

  function repositionToolBar()
  {
    $backButton.stop().css({
      top: lastY + 8 + "px",
      left: lastX + 10 + "px",
      opacity: 0
    }).animate({
      opacity: buttonOpacity
    }, 300);
  }

  function adjustCoordsForViewPort(coords)
  {
    return {
      x: coords.x - $(window).width()/2,
      y: coords.y - $(window).height()/2
    };
  }

  $(document).bind('sessions.loaded', function() {
    var $mapPanel = $("#conferenceMap");
    $mapPanel.bind("pageAnimationEnd", function(event, info) {
      if (info.direction != 'in') { return; }

      var scrollMapTo = $mapPanel.data('referrer').attr('data-room');

      var coords = mapCoordinates[scrollMapTo];
      if (!coords) { coords = {x:lastX, y:lastY}; }
      else {
        positionDot(coords.x, coords.y);
        coords = adjustCoordsForViewPort(coords);
      }

      setTimeout(function() {
        scrollTo(coords.x, coords.y);
        $mapPanel.animate({ opacity: 1 });
      }, 200);
    });
  });


  // This event handler is for displaying coordinates when clicked on the map.
  // It helps me make the room coordinate array below.

  // $mapPanel.bind('mousedown', function(event) {
  //   $("#coords").html(event.clientX + ", " + event.clientY).css({
  //     top: lastY + 40 + "px",
  //     left: lastX + "px"
  //   });
  // }).append('<div id="coords"></div>').find("#coords").css({
  //   position: 'absolute',
  //   color: 'red'
  // });

});


