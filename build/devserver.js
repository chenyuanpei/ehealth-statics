var express = require('express')
var path = require('path')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.dev.conf')
var config = require('./config')

var port = process.env.PORT || 8080

var compiler = webpack(webpackConfig)

var app = new WebpackDevServer(compiler, {
  https: port == '443',
  publicPath: config.publicPath,
  hot: true,
  historyApiFallback: true,
  disableHostCheck: true,
  staticOptions: {}
})

// static
app.use(config.publicPath + 'static/', express.static(path.resolve(__dirname, '../static')))

app.listen(port, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:' + port);
});
