var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'];

function Presentation($element)
{

  this.id = $element.attr("id");
  this.title = $element.find("li._title").html();
  this.location = $element.find("li._location").html();
  this.description = $element.find("div.description").html();
  this.startTime = new Date(Date.parse($element.find("li._startTime").html()));
  this.endTime = new Date(Date.parse($element.find("li._endTime").html()));
  this.$element = $element;


  this.setBackButtonTitle = function(title)
  {
    this.$element.find("> div.toolbar > a.back").html(title);
    console.log(this.$element[0]);
  }


  this.dayGroup = function()
  {
    return weekdays[this.startTime.getDay()];
  }


  this.timeGroup = function()
  {
    var time = this.startTime;
    return noMilitary(time) +
      ":" +
      leftPadZero(time.getMinutes()) +
      " " +
      ampm(time);
  }


  function noMilitary(time)
  {
    if (time.getHours() > 12) {
      return time.getHours() - 12;
    } else if (time.getHours() == 0) {
      return 12;
    }
    return time.getHours();
  }


  function leftPadZero(num)
  {
    if (num < 10) {
      return "0" + num;
    }
    return num + "";
  }


  function ampm(time)
  {
    if (time.getHours() >= 12) {
      return "pm";
    }
    return "am";
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

