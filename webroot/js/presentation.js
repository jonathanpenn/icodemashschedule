function Presentation($element)
{

  this.room = $element.attr("room");
  this.startTime = new Date(Date.parse($element.attr("startTime")));
  this.endTime = new Date(Date.parse($element.attr("endTime")));
  this.title = $element.find("h2").html();
  this.description = $element.find(".description").html();

}
