$(function() {
  Database.initialize();
});

$(document).bind('pagebeforechange', function(e, data) {
  Database.ensureInitialized();

  if (typeof data.toPage !== 'string') return;
  var url = $.mobile.path.parseUrl(data.toPage);
  var $page = $(url.hash);
  if ($page.length > 0) return;

  var pageId = url.hash.replace(/#/,'');
  Router.routeToPageId(pageId);

});

$(document).bind('pagechange', function(e, data) {
  if (data.options.reverse && data.options.fromPage) {
    // Remove the old page we're coming back from
    $(data.options.fromPage).remove();
  }
});

Router = {
  routeToPageId: function(pageId) {
    if (this.isSessionId(pageId)) {
      this.displaySession(pageId);
    } else {
      this[pageId]();
    }
  },

  precompiler_sessions: function() {
    (new SessionListPageView({
      id: "precompiler_sessions",
      sessions: SessionFilter.precompiler(),
      title: "Precompiler"
    })).render();
  },

  thursday_sessions: function() {
    (new SessionListPageView({
      id: "thursday_sessions",
      sessions: SessionFilter.thursday(),
      title: "Thursday"
    })).render();
  },

  friday_sessions: function() {
    (new SessionListPageView({
      id: "friday_sessions",
      sessions: SessionFilter.friday(),
      title: "Friday"
    })).render();
  },

  isSessionId: function(pageId) {
    return pageId.search(/^session-/) !== -1;
  },

  displaySession: function(pageId) {
    var session = this.sessionFromPageId(pageId);
    if (!session) {
      console.log("Could not find session with id", pageId);
      return;
    }

    var page = new SessionDetailPageView({
      model: session,
      id: pageId
    });
    $("body").append(page.render().el);
  },

  generateSessionId: function(session) {
    return "session-" + session.uniqueId();
  },

  sessionFromPageId: function(pageId) {
    var sessionId = pageId.replace(/^session-/, '');
    return Database.sessions.withUniqueId(sessionId);
  }

}

