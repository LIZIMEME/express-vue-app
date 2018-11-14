var config = require('config')
var util = require('util')
var path = require('path')
var openApi_cnode = config.get('openApi_cnode')
var logger_tag = path.basename(__filename).split('.')[0]
var logger = require('../utils/logger').getLogger(logger_tag)
var requestUtils = require('../utils/request')
var requestOpenApi =  requestUtils.requestOpenApi
// 获取所有topics

exports.describeTopics = function(req,page,limit,tab,mdrender,callback){
    var uri = util.format('%s/api/v1/topics?page=%s&limit=%s&tab=%s&mdrender=%s',
    openApi_cnode,page,limit,tab,mdrender)
    logger.info(util.format('describeTopics [uri: %s]'),uri)
    requestOpenApi(req,uri,'GET',null,null,callback)
}
