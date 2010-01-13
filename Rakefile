namespace :version do

  desc "Bump the version number (for cache.manifest)"
  task :bump do
    version = Version.new
    version.bump
    version.write
    puts "Version is now %s" % [version.to_s]
  end

end

desc "Fetch new sessions to webroot/js/schedule.js"
task :fetch_schedule do
  `ruby script/update_session_feed.rb`
end


class Version
  attr_reader :version

  def initialize(base_dir = File.dirname(__FILE__))
    @version = File.read(version_path).chomp.to_i
  end

  def write
    File.open(version_path, 'w') do |file|
      file.puts to_s
    end
  end

  def bump
    @version += 1
  end

  def to_s
    version
  end

  def version_path
    File.join(File.dirname(__FILE__), 'VERSION')
  end

end
