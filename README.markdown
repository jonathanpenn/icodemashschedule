iCodeMash 2010
==============

[CodeMash](http://codemash.org) is a great regional developers conference that takes place at the Kalahari Water Park in Sandusky, Ohio.

This year, they put their entire session calendar information online as an xml feed and encouraged attendees to build their own schedule apps. Here's mine. It's an installable iPhone webapp. It caches itself and even self updates using the HTML5 offline cache mechanism. You can probably use it with any WebKit browser (I know someone who's used it on an Android), but I've targeted and only done testing on an iPhone.

It's currently running as a Ruby Rack app on Heroku here:

http://icodemashschedule.heroku.com

It runs on jQuery/jQTouch in the browser and is fully open source.  Enjoy!

Jonathan Penn
http://wavethenavel.com

Navel Labs
http://navel-labs.com


Setup
=====

If you have ruby installed you can run your own version of the app on your machine. First, you'll need the bundler rubygem. At your command line, run:

    gem install bundler

Then clone a copy of the repository, enter the repo directory, and type:

    gem bundle

All the gem dependencies will be downloaded and installed for you locally in the repo directory. Once it's complete you can spin up rack by typing:

    rackup -p 3000

Now, you have an HTTP server running on localhost at port 3000. Visit `http://localhost:3000` to see the app. (And check out `http://localhost:3000/test` for the Javascript test suite)

By default, the rack app uses HTML5 offline caching which means that the browser will only download all the assets once. It will only update the cache if the contents at the url `/cache.manifest` changes. I have a rake task, `rake version:bump` that will automatically increment a version number in those contents and indicate to the browser to redownload the cache.

If you are developing, I created a simple environment flag to turn off the caching:

    caching=false rackup -p 3000

That makes `/cache.manifest` return a 404 which will make the browser always invalidate the cache and redownload the files on every refresh.


Fetching Schedule Data
======================

The application does not fetch session data over the internet in real time. One of the pains of success we experienced at CodeMash last year: scarce bandwidth. The conference organizers are sharp, though, and I don't doubt that they have a plan to attack that problem this year. But either way, I didn't want the app to depend at all on the network to operate.

Also, some of the schedule data worked best when preprocessed to clean up some munged HTML entities and mistakes.

With that in mind, I decided to write a ruby script that pulls down the schedule data, preprocesses it, and writes it out as executable javascript to `webroot/js/schedule.js`. I plan to regularly check if there are any schedule changes and commit the changes into the repo. Then, after bumping the version and pushing to heroku, anyone who opens their app will download the changes automatically.

Yes, it may sound like a lot of work, but it made the development much simpler.

To run the schedule downloading script yourself, just type:

    ruby script/update_session_feed.rb

