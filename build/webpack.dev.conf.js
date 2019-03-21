var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('./config')
var baseWebpackConfig = require('./webpack.base.conf')
var projectRoot = path.resolve(__dirname, '../')
// add hot-reload related code to entry chunks

baseWebpackConfig.entry.vendor = [
  'webpack-dev-server/client?http://localhost',
  'webpack/hot/only-dev-server',
].concat(baseWebpackConfig.entry.vendor || [])
// {
//   test: /\.js$/,
//     loader: 'babel',
//   include: [
//   path.join(projectRoot, 'src'),
//   path.join(projectRoot, 'node_modules/vue-strap/src'),
//   path.join(projectRoot, 'node_modules/keen-ui/src'),
// ],
//   // exclude: /node_modules/
// },
module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ "babel"],
        exclude: /node_modules/,
        include: path.join(__dirname, '../')
      }
    ]
  },
  // eval-source-map is faster for development
  devtool: 'eval',
  output: {
    path: config.distPath,
    filename: "scripts/[name].js",
    chunkFilename: 'scripts/[id].js',
    publicPath: config.publicPath
  },
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        ROOT_PATH: JSON.stringify(config.publicPath),
      }
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.indexTemplate,
      inject: true
    })
    //new webpack.NoErrorsPlugin()
    // https://github.com/ampedandwired/html-webpack-plugin
  ]
})
