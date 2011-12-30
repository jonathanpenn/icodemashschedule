String.prototype.escapeHTML = function () {
  // Helper function to escape a string for HTML rendering.
  return this.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;').
    replace(/</g, '&lt;').
      replace(/>/g, '&gt;').
        replace(/"/g, '&quot;').
          replace(/'/g, '&#x27;').
            replace(/\//g,'&#x2F;');
}

String.prototype.scrubHTML = function() {
  var scriptFree = this.replace(/<\s*\/\s*script\s*>/gi, '').
    replace(/<\s*script[^>]*>/, '');
  var $str = $("<div></div>").html(scriptFree);
  $str.find('stylesheet').remove();
  $str.find('link').remove();
  $str.find("*[style]").removeAttr('style');
  $str.find("*[class]").removeAttr('class');
  $str.find("*[id]").removeAttr('id');
  return $str.html();
}

String.prototype.stripHTML = function() {
  var raw = this+'';
  var scrubber = $("<span>");
  return scrubber.html(raw).text();
}

