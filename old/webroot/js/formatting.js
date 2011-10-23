(function() {

  var weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'];


  window.formatting = {

    shortTime: function(time)
    {
      return noMilitary(time) +
        ":" +
        leftPadZero(time.getMinutes()) +
        " " +
        ampm(time);
    },


    weekday: function(time)
    {
      return weekdays[time.getDay()];
    }

  };


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

})();
