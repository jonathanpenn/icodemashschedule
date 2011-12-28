$(document).bind('pagebeforechange', function(e, data) {

  if (typeof data.toPage !== 'string') return;

  var url = $.mobile.path.parseUrl(data.toPage);
  var $page = $(url.hash);

  if ($page.length > 0) return;

  var page = new PageView();
  page.setId(url.hash.replace(/#/,''));
  page.render();

});

$(document).bind('pagechange', function(e, data) {

  if (typeof data.toPage === 'string') return;

  if (data.options.reverse && data.options.fromPage) {
    $(data.options.fromPage).remove();
  }

});

