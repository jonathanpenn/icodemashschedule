var SessionTimeSlot = Backbone.Model.extend({

  when: function() {
    return this.get('when');
  },

  dayName: function() {
    return this.when().strftime("%A");
  },

  hourName: function() {
    return this.when().strftime("%I:%M %P").replace(/^0/, '');
  },

  sessions: function() {
    return this.get('sessions');
  },

  pageId: function() {
    return "sessionslot-"+this.when().valueOf();
  }

});

SessionTimeSlot.timeFromPageId = function(pageId) {
  var matches = pageId.match(/sessionslot-(\d+)/);
  return new Date(matches[1]-0);
}

