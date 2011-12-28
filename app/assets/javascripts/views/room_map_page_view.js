RoomMapPageView = {

  show: function(roomName) {
    $("#room_map").remove(); // Clear an existing room map

    var template = _.template($("#room_map_template").html());
    var $page = $(template());

    $("body").append($page);
    $page.page();

    $.mobile.changePage('#room_map');
  }

};

function scrollHandler(e) {
  var $page = $('#room_map');
  $page.find('a').css({
    top: $(window).scrollTop() + 5,
    left: $(window).scrollLeft() + 5
  });
}

function showPoint(point) {
  _.delay(function() {
    $(window).scrollTop(point.y);
    $(window).scrollLeft(point.x);
    scrollHandler();
  }, 100);
}

$('#room_map').live('pageinit', function() {
  $(document).bind('scrollstop', scrollHandler);
});

$("#room_map").live('pagehide', function() {
  $(document).unbind('scrollstop', scrollHandler);
});

$("#room_map").live('pageshow', function() {
  var $page = $('#room_map');
  showPoint({x: 100, y: 300});
});

