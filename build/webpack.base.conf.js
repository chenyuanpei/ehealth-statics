var path = require('path')
var config = require('./config')

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js'),
    // loadjs: path.join(__dirname, '../client/loadjs.js')
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    fallback: [path.join(__dirname, '../node_modules')],
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.join(__dirname, "../"),
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }, {
        test: /\.scss/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.less/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.svg$/i,
        loader: 'raw-loader',
      },
      {
        test: /\.styl/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  }
}
