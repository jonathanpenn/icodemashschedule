$(document).ready(function() {

  var mapCoordinates = {
    'Portia/Wisteria':  {x:359, y:501},
    'Cypress':          {x:762, y:304},
    'D':                {x:613, y:353},
    'E':                {x:619, y:266},
    'Mangrove':         {x:407, y:598},
    'Indigo Bay':       {x:242, y:299},
    'Guava/Tamarind':   {x:462, y:504}
  };

  var $mapPanel = $("#conferenceMap");
  var $toolbar = $mapPanel.find(".toolbar");
  var positionTimer;
  var lastX = 0, lastY = 0;
  var buttonOpacity = '0.9';

  $mapPanel.bind("pageAnimationStart", function(event, info) {
    if (info.direction == 'in') {
      $toolbar.css({ opacity: '0' });
      $mapPanel.css({ opacity: '0' });
    } else {
      $mapPanel.css({ opacity: '0' });
      clearTimeout(positionTimer);
      positionTimer = null;
    }
  }).bind("pageAnimationEnd", function(event, info) {
    if (info.direction == 'in') {
      scrollTo(lastX, lastY);
      scrolling();
    }
  });

  function scrolling()
  {
    positionTimer = setTimeout(scrolling, 200);

    var nowY = $(document).scrollTop();
    var nowX = $(document).scrollLeft();

    if (nowY != lastY || nowX != lastX) {
      lastY = nowY;
      lastX = nowX;
    }

    repositionToolBar();
  }

  function repositionToolBar()
  {
    $toolbar.stop().animate({
      top: lastY + "px",
      left: lastX + "px",
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

      var scrollMapTo = $mapPanel.data('referrer').text();
      $mapPanel.find("h1").html(scrollMapTo);

      var coords = mapCoordinates[scrollMapTo];
      if (!coords) { coords = {x:lastX, y:lastY}; }
      else { coords = adjustCoordsForViewPort(coords); }

      setTimeout(function() {
        scrollTo(coords.x, coords.y);
        $mapPanel.animate({ opacity: '1' });
      }, 200);
    });
  });

  // This event handler is for displaying coordinates when clicked on the map.
  // It helps me make the room coordinate array below.
  //
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


