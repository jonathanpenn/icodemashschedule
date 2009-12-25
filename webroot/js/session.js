function Session(initData)
{
  for (x in initData) {
    this[x] = initData[x];
  }

  this.dayGroup = function()
  {
    return formatting.weekday(this.start);
  }

  this.timeGroup = function()
  {
    return formatting.shortTime(this.start);
  }

  this.slotGroup = function()
  {
    return this.start.valueOf();
  }

}


SortSessions = {

  byStartTime: function(sessions)
  {
    return sessions.sort(function(a, b) {
      if (a.start > b.start) {
        return 1;
      } else if (a.start < b.start) {
        return -1;
      } else {
        return a.title > b.title ? 1 : -1;
      }
    });
  }

};


GroupSessions = {

  byDayGroup: function(sessions)
  {
    return $.groupBy(sessions, function(rec) {
      return rec.dayGroup();
    });
  },

  byTimeGroup: function(sessions)
  {
    return $.groupBy(sessions, function(rec) {
      return rec.timeGroup();
    });
  },


  bySlotGroup: function(sessions)
  {
    return $.groupBy(sessions, function(rec) {
      return rec.slotGroup();
    });
  }

};


function FindsSession(sessions)
{

  this.byId = function(id)
  {
    for (key in sessions) {
      if (sessions[key].id == id) {
        return sessions[key];
      }
    }
  }

}
