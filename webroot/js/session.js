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

}


SortPresentations = {

  byStartTime: function(presentations)
  {
    return presentations.sort(function(a, b) {
      if (a.startTime > b.startTime) {
        return 1;
      } else if (a.startTime < b.startTime) {
        return -1;
      } else {
        return a.title > b.title ? 1 : -1;
      }
    });
  }

};


GroupPresentations = {

  byDayGroup: function(presentations)
  {
    return $.groupBy(presentations, function(rec) {
      return rec.dayGroup();
    });
  },

  byTimeGroup: function(presentations)
  {
    return $.groupBy(presentations, function(rec) {
      return rec.timeGroup();
    });
  }

};

