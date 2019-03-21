var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('./config')
var baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ["babel"],
      exclude: /node_modules/,
      include: path.join(__dirname, '../')
    }]
  },
  devtool: '#source-map',
  output: {
    path: config.distPath,
    filename: "scripts/[name].[chunkhash].js",
    chunkFilename: 'scripts/[id].[chunkhash].js',
    publicPath: config.publicPath,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ROOT_PATH: JSON.stringify(config.publicPath),
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.indexTemplate,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
})
