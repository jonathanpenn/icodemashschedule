$(document).bind('mobileinit', function() {
  $.mobile.defaultPageTransition = 'slide';
  $.mobile.pushStateEnabled = false;
  $.mobile.page.prototype.options.addBackBtn = true;
});

