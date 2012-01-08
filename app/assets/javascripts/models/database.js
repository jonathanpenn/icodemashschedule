Database = {
  sessions: null,

  ensureInitialized: function() {
    this.initialize();
  },

  initialize: function(callback) {
    if (this.sessions) return;

    this.loadFromLocalStorage();

    var sessions = Database.sessions;

    if (sessions.models.length == 0) {
      Database.refreshFromServer(function() {
        if (callback) callback();
      });
    } else {
      var self = this;
      _.delay(function() {
        self.triggerBackgroundRefreshing();
      }, 500);
    }

    console.log("Database initialized");
  },

  triggerBackgroundRefreshing: function() {
    var self = this;
    Database.refreshFromServer(function() {
      _.delay(function() {
        self.triggerBackgroundRefreshing();
      }, 20*60*1000);
    });
  },

  saveToLocalStorage: function() {
    window.localStorage['sessions'] = this.sessions.serialize();
    Favorites.save();
  },

  loadFromLocalStorage: function() {
    Favorites.load();

    var data = window.localStorage['sessions'];
    if (!data) this._initSessions();
    else { this.sessions = Sessions.deserialize(data); }
  },

  refreshFromServer: function(callback) {
    if (!this.sessions) this._initSessions();

    APILog.clear();
    APILog.puts("Fetching session data from server...");

    SyncStatus.show();
    var self = this;
    this.sessions.fetch({
      complete: function() {
        Database.saveToLocalStorage();
        if (callback) callback();
        SyncStatus.hide();
      },
      success: function() {
        self.setLastUpdated();
        console.log("Database refreshed from server");
        APILog.puts("Sessions fetched and saved to local storage.");
        APILog.puts("Last updated:");
        APILog.timestamp(self.lastUpdated());
      },
      error: function() {
        APILog.puts("Unable to contact the CodeMash session API.");
        APILog.puts("Using cached sessions.");
        APILog.puts("Last updated:");
        APILog.timestamp(self.lastUpdated());
      }
    });
  },

  lastUpdated: function() {
    var data = window.localStorage['databaseLastUpdated']-0;
    if (data) return new Date(data);
    else return null;
  },

  setLastUpdated: function() {
    window.localStorage['databaseLastUpdated'] = (new Date()).valueOf();
  },

  clear: function() {
    window.localStorage['sessions'] = null;
    this.loadFromLocalStorage();
  },

  _initSessions: function() {
    this.sessions = new Sessions();
  }
}

