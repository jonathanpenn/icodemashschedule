function DataLoader()
{

  this.loadFrom = function(url)
  {
    var result;

    $.ajax({
      url: url,
      cache: false,
      dataType: 'html',
      type: 'GET',
      success: function(html) { result = html; },
      async: false
    });

    return result;
  }

  this.loadWithCache = function(url)
  {
    if (DataLoader.cache[url]) {
      return DataLoader.cache[url];
    }

    var result = this.loadFrom(url);
    DataLoader.cache[url] = result;
    return result;
  }

}


if (!DataLoader.cache) {
  DataLoader.cache = {};
}
