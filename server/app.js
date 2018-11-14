
var createError = require('http-errors')
var express = require('express')
var util = require('util')
var log4js = require('log4js')
var logger = require('./routes/utils/logger').getLogger('app')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('config')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express()

// openapi
var topicOpenApi = require('./routes/openApi/topic')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// app.use(logger('dev'))
app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO, format: ':method :url'}));
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/topic', topicOpenApi)

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname ,'./src/index.html'));
// });
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  if (err) {
    if (err.message) {
      logger.error(util.format("app development error handler [err: %s]",err.stack))
    } else {
      var mess = JSON.stringify(err) + "未知错误"
      logger.error(util.format("app development error handler [err: %s]", mess))
    }
  }
  res.send('error')
})

module.exports = app
