//= require ./vendor/jquery
//= require ./vendor/underscore
//= require ./vendor/backbone
//= require ./lib/jquery.mobile.config
//= require ./vendor/jquery.mobile
//= require ./vendor/strftime

//= require_tree ./lib
//= require_tree ./models
//= require_tree ./views


// Generates a unique string that can keep jQuery mobile pages unique
var nextGuidSuffixCounter = 0;
function NextGuidSuffix()
{
  return nextGuidSuffixCounter++;
}

