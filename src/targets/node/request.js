'use strict';

var util = require('util');
var reducer = require('.,/../../reducer');

module.exports = function(options) {
  var opts = util._extend({
    indent: '  '
  }, options);

  var code = [];

  var reqOpts = {
    url: this.source.fullUrl,
    headers: this.source.headersObj
  };
  var fsReplace = [];
  if (this.source.headersObj['Content-Type'] === 'application/x-www-form-urlencoded') {
    reqOpts.formData = this.source.postData.params.reduce(function(finalObj, thisParam) {
      finalObj[thisParam.name] = thisParam.value;
      return finalObj;
    }, {});
  }
  else if (this.source.headersObj['Content-Type'] === 'application/json') {
    if (this.source.postData.params) {
      reqOpts.body = JSON.stringify(
        this.source.postData.params.reduce(function(finalObj, thisParam) {
          finalObj[thisParam.name] = thisParam.value;
          return finalObj;
        }, {})
      );
    }
    reqOpts.json = true;
  }
  else if (this.source.headersObj["Content-Type"] === "multipart/form-data") {
    this.source.postData.params.forEach(function(param) {
      reqOpts.formData = reqOpts.formData || {};
      reqOpts.formData[param.name] = {};
      if (param.fileName) {
        if (!param.value.length) {
          param.value = 'fs.createReadStream(\'' + param.fileName + '\')';
          fsReplace.push(param.value);
        }
        reqOpts.formData[param.name].value = param.value;
        if (param.fileName.indexOf('/') > -1) {
          param.fileName = param.fileName.split('/');
          param.fileName = param.fileName[param.fileName.length - 1];
        }
        else if (param.fileName.indexOf('\\') > -1) {
          param.fileName = param.fileName.split('\\');
          param.fileName = param.fileName[param.fileName.length - 1];
        }
        reqOpts.formData[param.name].options = {
          filename: param.fileName,
          "content-type": param.contentType
        }
      }
      else {
        reqOpts.formData[param.name] = param.value;
      }
    })
  }
  else {
    reqOpts.body = this.source.postData.params;
  }

  var simpleRequest = 
    this.source.cookies.length === 0 && 
    this.source.headers.length === 0 && (
      !this.source.postData.params ||
      this.source.postData.params.length === 0
    );
  
  // construct cookies argument
  var cookies = this.source.cookies.map(function(cookie) {
    return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
  });

  if (cookies.length) {
    reqOpts.headers.Cookie = cookies.join('; ');
  }

  code.push('var request = require(\'request\');');
  if (fsReplace.length > 0) {
    code.push('var fs = require(\'fs\');');
  }

  if(!simpleRequest) code.push(null);

  var options = !simpleRequest ? util.format('var options = %s;', JSON.stringify(reqOpts, null, opts.indent)) : null;
  fsReplace.forEach(function(fsToReplace) {
    options = options.replace('"' + fsToReplace + '"', fsToReplace);
  })

  if(!simpleRequest) code.push(options);

  code.push(null);
  var requestLine = 'request.';
  requestLine += this.source.method === 'DELETE' ? 'del(' : this.source.method.toLowerCase() + '(';
  requestLine += simpleRequest ? '\'' + this.source.fullUrl + '\'' : 'options';
  requestLine += ', function(error, response, body){';
  code.push(requestLine);
  code.push(opts.indent + 'if(error) throw new Error(error);');

  code.push(null);

  code.push('});');

  code.push(null);

  return code.join('\n');
};

module.exports.info = {
  key: 'request',
  title: 'request',
  link: 'https://github.com/request/request',
  description: 'Simplified HTTP request client'
};
