var util = require('util');
var path = require('path')
var logger_tag = path.basename(__filename).split('.')[0]
var logger = require('./logger').getLogger(logger_tag)

function toString(){
    return Object.prototype.toString.call
}
function fromQueryOrBody(req,name){
    logger.info(util.format('from query or body [name: %s]',name))
    var paramVal = req.query[name]||req.body[name]
    // number
    if (Number.isFinite(paramVal)) {
        return paramVal;
    }
    // null '' undefined
    if (toString(paramVal) ==="[object Undefined]"||toString(paramVal) ==="[object Null]") {
        return "";
    }
    return paramVal;
}
function _defaultFormatter(data) {
    return data
}

// callback setting
function responseOpenApiJson(cb,formatter){
    return function(error, response,body){
        if(error){
            logger.error(util.format("lib responseOpenApiJson [err: %s]",error))
        }
        var my_formatter = formatter ? formatter : _defaultFormatter
        if(response && response.body){
            var result = response.body
            if(response.headers && typeof(result) == 'object'){
                result['headers'] = response.headers;
            }
            result = my_formatter(result)
            if(response.error != undefined && response.error){
                logger.error(util.format("lib responseOpenApiJson [err: %s]",error))
                return cb(result)
            }
            return cb(null,result)
        }
        // proper
        var result
        try {
            logger.info(util.format("lib  responseOpenApiJson [response.body: %s]", response.body));
            result = response.body ? JSON.parse(response.body) : null
        } catch (err) {
            logger.error(util.format("lib  responseOpenApiJson [err%s]", err));
            return cb(err)
        }
        result = my_formatter(result);
        cb(null, result)
    }
}
exports.fromQueryOrBody = fromQueryOrBody
exports.responseOpenApiJson = responseOpenApiJson

