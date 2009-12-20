require 'rack'
require 'cache_manifesto'

APP_VERSION = "0.5"
HTML5_CACHING = false

use Rack::ShowExceptions
use Rack::ContentType, 'text/html'

use CacheManifesto

use Rack::Static, :urls => ['/'], :root => 'webroot'

run proc { [404, {}, ''] }
