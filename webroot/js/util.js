$.groupBy = function(arr, grouper)
{
  var grouped = {};

  $.each(arr, function(index, val) {
    var groupVal = grouper(val);
    if (grouped[groupVal] == undefined) {
      grouped[groupVal] = [];
    }
    grouped[groupVal].push(val);
  });

  return grouped;
}


function domid()
{
  var arr = [];
  for (var i = 0; arguments[i] != undefined; i++ ) {
    arr.push(arguments[i])
  }
  return arr.join("_").replace(/[^_A-z0-9]/g, '').toLowerCase();
}
