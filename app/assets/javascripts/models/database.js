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
    if (!data) { this.sessions = new Sessions(); }
    else { this.sessions = Sessions.deserialize(data); }
  },

  refreshFromServer: function(callback) {
    if (!this.sessions) { this.sessions = new Sessions(); }

    APILog.clear();
    APILog.timestamp();
    APILog.puts("Fetching session data from server...");

    SyncStatus.show();
    this.sessions.fetch({
      complete: function() {
        Database.saveToLocalStorage();
        if (callback) callback();
        SyncStatus.hide();
      },
      success: function() {
        console.log("Database refreshed from server");
        APILog.puts("Sessions fetched and saved to local storage.");
      },
      error: function() {
        APILog.puts("Unable to contact the CodeMash session API.");
        APILog.puts("Using cached sessions.");
      }
    });
  },

  clear: function() {
    window.localStorage['sessions'] = null;
    this.loadFromLocalStorage();
  }
}

