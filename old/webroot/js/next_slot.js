function $RenderTimeSlot(slot)
{
  var weekday = formatting.weekday;
  var shortTime = formatting.shortTime;

  var slot = new Date(slot-0);
  var panelId = '#' + domid(weekday(slot), shortTime(slot));
  var displayName = weekday(slot) + " "  + shortTime(slot);

  return $("\
    <li class='arrow'>\
      <a href='"+panelId+"'>"+displayName+"</a>\
    </li>\
  ");
}


function NextSlotFinder(sessions)
{

  this.NEXT_SESSION_WINDOW = 10;  // In minutes

  this.nextSince = function(date)
  {
    return getNextSlotSince(getSlotsFromSessions(sessions),
      this.threshold(date));
  }

  this.threshold = function(date)
  {
    return date.valueOf() - (this.NEXT_SESSION_WINDOW * 60000);
  }

  function getSlotsFromSessions(sessions)
  {
    var groupedSessions = $.groupBy(sessions, function(session) {
      return session.start.valueOf();
    });

    var slots = [];
    for (slot in groupedSessions) { slots.push(slot-0); }

    return slots;
  }

  function getNextSlotSince(slots, since)
  {
    var next;
    since = since.valueOf();
    $.each(slots, function(index, slot) {
      if (slot > since) {
        next = slot;
        return false;
      }
    });
    return next;
  }

}
