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


$.keys = function(hash)
{
  var keys = [];
  for (key in hash) { keys.push(key); }
  return keys;
}


$.values = function(hash)
{
  var values = [];
  for (key in hash) { values.push(hash[key]); }
  return values;
}


function domid()
{
  var arr = [];
  for (var i = 0; arguments[i] != undefined; i++ ) {
    arr.push(arguments[i])
  }
  return arr.join("_").replace(/[^_A-z0-9]/g, '').toLowerCase();
}
