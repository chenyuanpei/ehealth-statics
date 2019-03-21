var express = require('express')
var path = require('path')
var template = require('art-template')
var morgan = require('morgan')
var FileStreamRotator = require('file-stream-rotator')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var moment = require('moment')

var config = require('../build/config')

// ------------app----------------
var app = express()

// template
template.config('base', '')
template.config('extname', '.html')
app.engine('.html', template.__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')


// log
var accessLogStream = FileStreamRotator.getStream({
  filename: path.join(__dirname, '../logs', 'access-%DATE%.log'),
  date_format: 'YYYYMMDD',
  frequency: 'daily',
  verbose: false
})
morgan.token('date', function getDate(req) {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS')
})
var format = ':date [HTTP/:http-version]:remote-addr [:method]:url [:status]:response-time ms :user-agent'
app.use(morgan(format, {stream: accessLogStream}))
//app.use(morgan('dev'))

// parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser())

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')({
  index: config.publicPath + 'index.html',
  verbose: true // 输出日志
}))

// static
app.use(config.publicPath, express.static(config.distPath))
app.use(config.publicPath + '/index.html', express.static(path.resolve(config.distPath, './index.html')))

// authorize
var authorize = require('./authorize')
authorize(app)

// im
var im = require('./im')
im(app)

// react page
// var page = require('./page')
// page(app)

// 404
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    //res.json({
    //    message: err.message,
    //    error: err
    //})
    res.render('error', {
      message: err.message,
      error: err
    })

  })
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //})
  })
}

module.exports = app
