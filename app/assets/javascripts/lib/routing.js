$(document).ready(function() {
  var url = $.mobile.path.parseUrl(location.href);
  if (url.hash && url.hash != '') location.href = '/';
});

$(document).bind('pagebeforechange', function(e, data) {

  if (typeof data.toPage !== 'string') return;

  var url = $.mobile.path.parseUrl(data.toPage);
  var $page = $(url.hash);

  if ($page.length > 0) return;

  var page = new PageView({id: url.hash.replace(/#/,'')});
  page.render();

});

$(document).bind('pagechange', function(e, data) {

  if (typeof data.toPage === 'string') return;

  if (data.options.reverse && data.options.fromPage) {
    $(data.options.fromPage).remove();
  }

});

