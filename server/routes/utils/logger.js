var config = require('config')
var log4js = require('log4js')
log4js.configure({
  appenders: {
    cheese: { type: 'file', filename: 'cheese.log'},
    console: {type: 'console'}
  },
  categories: {
    default: {
      appenders: ['console', 'cheese'],
      level: config.get('logLevel')
    }
  }
})
// var logger = log4js.getLogger('cheese')
// logger.level = 'debug'
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Comté.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
//

exports.getLogger = function (name) {
  console.log('getLogger name:' + name)
  var logger = log4js.getLogger(name)
  return logger
}
