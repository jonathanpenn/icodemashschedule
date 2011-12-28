$(function() {
  Database.initialize();
});

$(document).bind('pagebeforechange', function(e, data) {

  if (typeof data.toPage !== 'string') return;
  var url = $.mobile.path.parseUrl(data.toPage);
  var $page = $(url.hash);
  if ($page.length > 0) return;

  var pageId = url.hash.replace(/#/,'');
  Router.routeToPageId(pageId);

});

$(document).bind('pagechange', function(e, data) {

  if (typeof data.toPage === 'string') return;

  if (data.options.reverse && data.options.fromPage) {
    $(data.options.fromPage).remove();
  }

});

Router = {
  routeToPageId: function(pageId) {

    var sessionListPageView = null;

    switch(pageId) {
      case "precompiler_sessions":
        (new SessionListPageView({
          id: "precompiler_sessions",
          sessions: SessionFilter.precompiler(),
          title: "Precompiler"
        })).render();
        break;
      case "thursday_sessions":
        (new SessionListPageView({
          id: "thursday_sessions",
          sessions: SessionFilter.thursday(),
          title: "Thursday"
        })).render();
        break;
      case "friday_sessions":
        (new SessionListPageView({
          id: "friday_sessions",
          sessions: SessionFilter.friday(),
          title: "Friday"
        })).render();
        break;
    }

  }
}

