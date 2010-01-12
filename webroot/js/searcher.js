function Searcher(sessions)
{

  var stopwords = "and or not the is a this but".split(" ");

  this.filter = function(keywords)
  {
    var result = [];

    if (keywords.length < 3) { return []; }

    keywords = prepareKeywords(keywords);

    for (i in sessions) {
      var session = sessions[i];
      if (sessionMatches(session, keywords)) {
        result.push(session);
      }
    }

    return result;
  }

  this.prepareKeywords = prepareKeywords;


  function sessionMatches(session, keywords)
  {
    return titleMatches(session, keywords) || speakerMatches(session, keywords);
  }


  function titleMatches(session, keywords)
  {
    var found = 0;
    var title = session.title.toLowerCase();
    for (i in keywords) {
      if (title.indexOf(keywords[i]) >= 0) {
        found++;
      }
    }
    return found == keywords.length;
  }

  function speakerMatches(session, keywords)
  {
    var found = 0;
    var speaker = session.speaker.toLowerCase();
    for (i in keywords) {
      if (speaker.indexOf(keywords[i]) >= 0) { found ++; }
    }
    return found == keywords.length;
  }


  function prepareKeywords(keywords)
  {
    var stripThese = /[^A-z0-9\s]/g;
    var words = [];
    words = keywords.toLowerCase().
      replace(stripThese, '').
      replace(/\s+/g, ' ').
      split(" ");
    words = removeStopwords(words);
    return words;
  }


  function removeStopwords(words)
  {
    var result = [];
    for (i in words) {
      var word = words[i];
      if (!isStopword(word)) result.push(word);
    }
    return result;
  }


  function isStopword(word)
  {
    for (i in stopwords) {
      if (stopwords[i] == word) return true;
    }
    return false;
  }

}


$(document).ready(function() {

  if (!window.sessions) { return; }

  var $searchResults = $("#search ul").eq(1);
  var $searchBox = $("#searchBox");
  var $results = $("#search .results");
  var $resultsHeader = $results.prev();
  var searcher = new Searcher(sessions);
  var searcherTimer;

  $searchBox.keydown(function() {
    clearScheduledSearch();
    scheduleSearch();
  }).focus(function() {
    $(this).val('');
  });;


  function clearSearchResults()
  {
    $searchResults.html('');
  }

  function renderSearchResults(sessions)
  {
    var menu = new MenuList();

    for (k in sessions) {
      var session = sessions[k];
      var htmlClass = favorites.hasSession(session) ? 'favorite' : '';

      menu.items.push(
        new MenuListItem({
          title: session.title,
          panel: session.id,
          htmlClasses: htmlClass
        })
      );
    }

    if (sessions.length == 0) {
      $searchResults.html('<li>No results found</li>');
    } else {
      $searchResults.html(menu.$render().find("li"));
    }
  }

  function clearScheduledSearch()
  {
    $searchBox.removeClass('searching');
    if (searcherTimer) {
      clearTimeout(searcherTimer);
      searcherTimer = null;
    }
  }

  function scheduleSearch()
  {
    $searchBox.addClass('searching');
    searcherTimer = setTimeout(function() {
      clearScheduledSearch();
      var results = searcher.filter($searchBox.val());
      $results.show();
      $resultsHeader.show();
      renderSearchResults(results);
    }, 1000);
  }

});
