$(document).ready(function() {

  module("Search", {setup:setup});

  var searcher;
  function setup()
  {
    searcher = new Searcher(sessions);
  }

});
