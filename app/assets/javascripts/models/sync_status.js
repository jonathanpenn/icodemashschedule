var SyncStatus = {
  count: 0,

  show: function() {
    this.count++;
    $("body").addClass("syncing");
  },

  hide: function() {
    this.count--;
    if (this.count == 0) $("body").removeClass("syncing");
  }
};
