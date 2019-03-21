var path = require('path')

var projectName = 'health'

module.exports = {
  distPath: path.join(__dirname, '../dist/' + projectName),
  publicPath: '/' + projectName + '/',
  indexTemplate: path.join(__dirname, '../client/index.html')
}
