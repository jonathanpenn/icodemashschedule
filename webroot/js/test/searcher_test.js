$(document).ready(function() {

  module("Search", {setup:setup});

  var searcher;
  function setup()
  {
    var sessions = [
      {title: 'First One', speaker: 'John Doe'},
      {title: 'Only One', speaker: 'Jane Doe'},
      {title: 'Another One to go', speaker: 'Jane Doe'},
      {title: 'Check with, punctuation', speaker: 'Jim Doe'},
      {title: 'non-adjacent words to find', speaker: 'Jane Doe'},
      {title: 'cAsE inSensiTivIty!', speaker: 'Jane Doe'}
    ];
    searcher = new Searcher(sessions);
  }


  test("returns empty array on no results", function() {
    var sessions = searcher.filter('aabcdefghijklmnop');
    equals( sessions.length, 0 );
  });


  test("filters session list to given keyword", function() {
    var sessions = searcher.filter('First');

    equals( sessions.length, 1 );
    equals( sessions[0].title, 'First One' );
  });


  test("returns multiple results for keywords", function() {
    var sessions = searcher.filter('One');

    equals( sessions.length, 3 );
    equals( sessions[0].title, 'First One' );
    equals( sessions[1].title, 'Only One' );
    equals( sessions[2].title, 'Another One to go' );
  });


  test("it searches case-insensitively", function() {
    var sessions = searcher.filter('insensitivity');

    equals( sessions.length, 1 );
    equals( sessions[0].title, 'cAsE inSensiTivIty!' );
  });


  test("it searches multiple keywords", function() {
    var sessions = searcher.filter('another go');

    equals( sessions.length, 1);
    equals( sessions[0].title, 'Another One to go' );
  });


  test("it ignores punctuation in keywords", function() {
    var sessions = searcher.filter('another, go');

    equals( sessions.length, 1);
    equals( sessions[0].title, 'Another One to go' );
  });


  test("it compacts extra whitespace" , function() {
    var sessions = searcher.filter("another   to \t\t  go");

    equals( sessions.length, 1);
    equals( sessions[0].title, 'Another One to go' );
  });


  test("keyword order doesn't matter", function() {
    var sessions = searcher.filter("go to another");

    equals( sessions.length, 1);
    equals( sessions[0].title, 'Another One to go' );
  });


  test("finds in text with punctuation", function() {
    var sessions = searcher.filter("with punctuation");

    equals( sessions.length, 1);
    equals( sessions[0].title, 'Check with, punctuation' );
  });


  test("doesn't find with search text less than 3 chars", function() {
    var sessions = searcher.filter("an");
    equals( sessions.length, 0 );
  });


  test("ignores stopwords", function() {
    var keywords = "Don't include and or not the is a this but";
    var preparedKeywords = searcher.prepareKeywords(keywords);
    equals( preparedKeywords.length, 2 );
    equals( preparedKeywords[0], 'dont' );
    equals( preparedKeywords[1], 'include' );
  });


  test("it also searches by author name", function() {
    var sessions = searcher.filter('john');
    equals( sessions.length, 1 );

    var sessions = searcher.filter('jane');
    equals( sessions.length, 4 );
  });


});
