var SessionTimeSlots = Backbone.Collection.extend({
  model: SessionTimeSlot,

  initialize: function(options) {
    _.bindAll(this, 'buildTimeSlotsFromSessions');
    this.sessions = options.sessions;
    this.sessions.bind('reset', this.buildTimeSlotsFromSessions);
  },

  comparator: function(slot) {
    return slot.when();
  },

  buildTimeSlotsFromSessions: function() {
    this.reset(null, {silent: true});
    var self = this;
    var dates = this.sessions.uniqueSessionDates();
    _.each(dates, function(when) {
      var when = new Date(when);
      self.add(new SessionTimeSlot({
        when: when,
        sessions: self.sessions.filter().byTimeSlot(when)
      }), {silent: true});
    });
    this.trigger('reset');
  }

});

