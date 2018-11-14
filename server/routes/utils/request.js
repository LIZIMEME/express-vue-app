var util = require('util')
var path = require('path');
var request = require('request')
var base = require('./base')
var responseOpenApiJson = base.responseOpenApiJson


exports.requestOpenApi = function(req,uri,method,headers,param,cb){
    var obj = {}
    if(uri!=''&&uri!=null){
        obj.uri = uri
    }else {
        var err = { msg: "url不能为空" };
        return cb(err);
    }
    // var host = req.headers.host;
    // if (host != undefined && ReferCheckMode) {
    //     if (!(endWith(host,".jcloud.com") || endWith(host,".jd.com")
    //         || endWith(host,".jdcloud.com") || endWith(host,".jdcloud.local"))) {
    //         logger.info(util.format("lib_requestUtils  responseJson [err 外部访问！]"));
    //         return cb("error:外部访问！");
    //     }
    // }
    //methods
    obj.method = 'GET'
    if (null != method && "" != method) {
        obj.method = method;
    }
    // headers
    if (null != headers) {
        obj.headers = headers;
    } else {
        obj.headers = {};
    }
    // params
    if (null != param && param) {
        obj.json = param;
    } else {
        obj.json = {};
    }
    request(obj,responseOpenApiJson(cb))

}
