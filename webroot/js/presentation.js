function Presentation($element)
{
  var $meta = $element.find("> div.meta");
  var $toolbar = $element.find("> div.toolbar");

  this.id = $element.attr("id");
  this.title = $meta.find("> h1.title").html();
  this.location = $meta.find("> div.location").html();
  this.description = $element.find("div.description").html();
  this.startTime = new Date(Date.parse($meta.find("> div.startTime").html()));
  this.endTime = new Date(Date.parse($meta.find("> div.endTime").html()));
  this.$element = $element;


  this.setBackButtonTitle = function(title)
  {
    $toolbar.find("> a.back").html(title);
  }


  this.setBackButtonPanel = function(panel_id)
  {
    $toolbar.find("> a.back").attr('href', '#' + panel_id);
  }


  this.dayGroup = function()
  {
    return formatting.weekday(this.startTime);
  }


  this.timeGroup = function()
  {
    return formatting.shortTime(this.startTime);
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

