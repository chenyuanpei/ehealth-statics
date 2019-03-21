require('shelljs/global')
env.NODE_ENV = 'production'
env.PORT = 8080

require('../build/devserver')
// require('../devserver/app')
