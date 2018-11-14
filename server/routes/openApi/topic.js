var express = require('express')
var router = express.Router()
var path = require('path')
var util = require('util')
var topicApi = require('../lib/topic')
var base = require('../utils/base')
var fromQueryOrBody = base.fromQueryOrBody
var responseWrapper = base.responseWrapper
var logger_tag = path.basename(__filename).split('.')[0]
var logger = require('../utils/logger').getLogger(logger_tag)

router.get('/describeTopics', function (req, res, next) {
  var page = fromQueryOrBody(req, 'page')
  var limit = fromQueryOrBody(req, 'limit')
  var tab = fromQueryOrBody(req, 'tab')
  var mdrender = fromQueryOrBody(req, 'mdrender')

  topicApi.describeTopics(req, page, limit, tab, mdrender, function (error, result) {
    if (error) {
      logger.error(util.format('topic describeTopics: [error: %s]', JSON.stringify(error).toString()))
      return res.json(error)
    }
    res.json(responseWrapper(result))
  })
})

router.get('/describeTopic',function (req,res,next) {
  var id =  fromQueryOrBody(req, 'id')
  topicApi.describeTopic(req, id, function (error, result) {
    if (error) {
      logger.error(util.format('topic describeTopic: [error: %s]', JSON.stringify(error).toString()))
      return res.json(error)
    }
    res.json(responseWrapper(result))
  })
})
module.exports = router
