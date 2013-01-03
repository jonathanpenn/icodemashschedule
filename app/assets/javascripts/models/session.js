Session = Backbone.Model.extend({

  when: function() {
    return new Date(this.get('when'));
  },

  room: function() {
    var room = this.get('room');
    if (!room) return "Room TBA";
    if (room.length == 1) return "Room " + room;
    else return room;
  },

  isPreCompiler: function() {
    var title = this.get('title');
    if (title.match(/^PreCompiler: /)) return true;
    else return false;
  },

  title: function() {
    var title = this.get('title');
    if (this.isPreCompiler()) {
      return title.replace("PreCompiler: ", '');
    } else return this.get('title');
  },

  abstract: function() {
    return this.get('abstract');
  },

  speakerName: function() {
    return this.get('speakerName');
  },

  difficulty: function() {
    return this.get('difficulty');
  },

  technology: function() {
    return this.get('technology');
  },

  uniqueId: function() {
    return (this.get('lookup') + "").toLowerCase();
  },

  pageId: function() {
    return "session-" + NextGuidSuffix() + "-" + this.uniqueId();
  },

  isFavorite: function() {
    return Favorites.containsSession(this);
  },

  markAsFavorite: function() {
    Favorites.addFavorite(this);
    this.trigger('change');
  },

  unmarkAsFavorite: function() {
    Favorites.removeFavorite(this);
    this.trigger('change');
  },

  toggleFavorite: function() {
    if (this.isFavorite()) this.unmarkAsFavorite();
    else this.markAsFavorite();
  },

  fulltext: function() {
    return [this.speakerName(),
      this.title(),
      this.abstract(),
      this.technology()].join(" ").toLowerCase();
  },

  extra: function() {
    return [this.technology(), this.difficulty()].join(', ');
  },


  // Query methods

  isMiscSession: function() {
    return this.isVendorSession();
  },

  isVendorSession: function() {
    return this.title().match(/^Vendor Sessions/) !== null;
  }

});

Session.findWithPageId = function(pageId) {
  var sessionId = pageId.replace(/^session-\d+-/, '');
  return Database.sessions.withUniqueId(sessionId);
}

