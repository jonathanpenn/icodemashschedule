Database = {
  sessions: null,

  initialize: function(callback) {
    this.loadFromLocalStorage();

    var sessions = Database.sessions;

    if (sessions.models.length == 0) {
      $.mobile.showPageLoadingMsg();
      Database.refreshFromServer(function() {
        $.mobile.hidePageLoadingMsg();
        if (callback) callback();
      });
    }
    console.log("Database initialized");
  },

  saveToLocalStorage: function() {
    window.localStorage['sessions'] = this.sessions.serialize();
  },

  loadFromLocalStorage: function() {
    var data = window.localStorage['sessions'];
    if (!data) { this.sessions = new Sessions(); }
    else { this.sessions = Sessions.deserialize(data); }
  },

  refreshFromServer: function(callback) {
    if (!this.sessions) { this.sessions = new Sessions(); }

    this.sessions.fetch({
      complete: function() {
        Database.saveToLocalStorage();
        console.log("Database refreshed from server");
        if (callback) callback();
      }
    });
  }
}

