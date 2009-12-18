Array.prototype.groupBy = function(grouper)
{
  var grouped = {};

  for (k in this) {
    var val = this[k];
    var groupVal = grouper(val);
    if (grouped[groupVal] == undefined) {
      grouped[groupVal] = [];
    }
    grouped[groupVal].push(val);
  }

  return grouped;
}
