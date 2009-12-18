require 'rack'
require 'delivery'
require 'cache_manifesto'

APP_VERSION = 1

use Rack::ShowExceptions
use Rack::ContentType, 'text/html'

use CacheManifesto

use Rack::Static, :urls => ['/'], :root => 'webroot'

run Delivery.new
