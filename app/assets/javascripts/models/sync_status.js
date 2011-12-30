var SyncStatus = {
  count: 0,

  show: function() {
    this.count++;
    $("body").addClass("syncing");
  },

  hide: function() {
    if (this.count == 0) return;
    this.count--;
    if (this.count == 0) $("body").removeClass("syncing");
  }
};
