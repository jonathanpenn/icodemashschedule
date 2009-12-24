function NextSlot(sessions)
{

  this.sessions = sessions;
  this.NEXT_SESSION_WINDOW = 10;   // minutes


  this.threshold = function(date)
  {
    return date.valueOf() - (this.NEXT_SESSION_WINDOW * 60000);
  }


  this.$renderSince = function(date)
  {
    var slots = getSlotsFromSessions(sessions);
    var next = getNextSlotSince(slots, this.threshold(date));
    if (!next) { return null; }
    return $("\
      <li class='arrow'>\
        <a href='"+slotPanelId(next)+"'>"+slotDisplayName(next)+"</a>\
      </li>\
    ");
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


  function slotPanelId(slot)
  {
    slot = new Date(slot -0 );
    return '#' + domid(formatting.weekday(slot), formatting.shortTime(slot));
  }


  function slotDisplayName(slot)
  {
    slot = new Date(slot);
    return formatting.weekday(slot) + " " + formatting.shortTime(slot);
  }

}
