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
  }

});

