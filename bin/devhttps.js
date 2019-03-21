require('shelljs/global')
env.NODE_ENV = 'development'
env.PORT = 443

require('../build/devserver')
// require('../devserver/app')
