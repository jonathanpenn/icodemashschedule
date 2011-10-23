require 'rack'
require_relative 'code_mash'
require_relative 'cache_manifest'

APP_VERSION = File.read(File.dirname(__FILE__) + '/VERSION')
HTML5_CACHING = ENV['caching'] == 'false' ? false : true

use Rack::Deflater
use Rack::ShowExceptions
use Rack::ContentType, 'text/html'
use CacheManifest
use CodeMash
use Rack::Static, :urls => ['/'], :root => 'webroot'
run proc { [404, {}, ''] }
