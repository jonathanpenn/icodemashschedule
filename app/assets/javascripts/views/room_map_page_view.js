//= require ./room_coordinates

RoomMapPageView = {

  show: function(roomName) {
    $.mobile.showPageLoadingMsg();
    this.roomName = roomName;
    $("#room_map img").css({opacity: 0});
    $.mobile.changePage('#room_map');
  },

  hasMapForRoom: function(roomName) {
    return roomCoordinates[roomName] != undefined;
  }

};

(function() {

  function scrollHandler(e) {
    var $page = $('#room_map');
    $page.find('a').css({
      top: $(window).scrollTop() + 5,
      left: $(window).scrollLeft() + 5
    });
  }

  function placeMapMarker(point) {
    var $dot = $("#room_map .dot");
    $dot.css({
      top: point.y - $dot.height()/2,
      left: point.x - $dot.width()/2
    });
  }

  function showPoint(point) {
    var corner = {
      x: point.x - $(window).width() / 2,
      y: point.y - $(window).height() / 2
    };

    $(window).scrollTop(corner.y);
    $(window).scrollLeft(corner.x);
    $("#room_map img").animate({opacity: 1});
    placeMapMarker(point);
    _.delay(scrollHandler, 100);
  }

  $("#room_map").live('pagehide', function() {
    $(document).unbind('scrollstop', scrollHandler);
  });

  $("#room_map").live('pageshow', function() {
    $(document).bind('scrollstop', scrollHandler);
    var $page = $('#room_map');
    var roomName = RoomMapPageView.roomName;
    var coordinates = roomCoordinates[roomName];
    if (coordinates) {
      _.delay(function() {
        showPoint(coordinates);
        $.mobile.hidePageLoadingMsg();
      }, 50);
    }
  });


  // Debug
  //$("#room_map").live('pageshow', triggerDebugMode);

  function triggerDebugMode() {

    var roomNames = _.sortBy(Database.sessions.allRoomNames(), function(s) { return s; });
    var roomNames = _.difference(roomNames, _.keys(roomCoordinates));

    console.log("Missing rooms:", roomNames);

    $("#room_map").bind('click', function(e) {
      var name = roomNames[i];
      var point = {x: e.pageX, y: e.pageY};
      roomCoordinates[name] = point;
      showPoint(point);

      console.log("var roomCoordinates = ", JSON.stringify(roomCoordinates, null, 2));

      var nextName = roomNames[++i];
      if (nextName) askForPointFor(nextName);
      else finishAsking();
    });

    $("#room_map").bind('mousemove', function(e) {
      var point = {x: e.pageX, y: e.pageY};
      placeMapMarker(point);
    });

    var i = 0;
    var firstName = roomNames[0];
    askForPointFor(firstName);

    function askForPointFor(name) {
      var coordinates = roomCoordinates[name];
      if (coordinates) showPoint(coordinates);
      console.log("Click on point for", name);
    }

    function finishAsking() {
      console.log("Done!");
    }

  }

})();
