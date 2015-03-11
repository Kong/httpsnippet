'use strict';

var util = require('util');
var path = require('path');

module.exports = function (options) {
  var opts = util._extend({
    indent: '  '
  }, options);

  var code = ['var unirest = require("unirest");', null];
  if(this.source.cookies.length){
    code.push('var CookieJar = unirest.jar();');
    var cookies = {};
    var url = this.source.url;
    this.source.cookies.forEach(function(cookie){
      code.push(util.format('CookieJar.add("%s=%s","%s")',encodeURIComponent(cookie.name), encodeURIComponent(cookie.value), url));
    })
    code.push(null);
  }
  code.push(util.format('unirest.%s("%s")', this.source.method.toLowerCase(), this.source.url));
  if (Object.keys(this.source.queryObj).length) {
    code.push(opts.indent + util.format('.query(%s)',JSON.stringify(this.source.queryObj)))
  }
  if(this.source.cookies.length){
    code.push(opts.indent + '.jar(CookieJar)')
  }
  if (Object.keys(this.source.headersObj).length) {
    var self = this;
    var newHeadersObj = Object.keys(this.source.headersObj).reduce(function(finalHeader, headerName){
      if(headerName !== 'Content-Type'){
        finalHeader[headerName] = self.source.headersObj[headerName];
      }
      return finalHeader;
    }, {})
    if(Object.keys(newHeadersObj).length){
      code.push(opts.indent + util.format('.headers(%s)',JSON.stringify(newHeadersObj)));
    }
  }
  if(this.source.postData.mimeType){
    if(this.source.postData.mimeType !== 'application/octet-stream'){
      code.push(opts.indent + util.format('.type("%s")',this.source.postData.mimeType))
    }
    if(this.source.postData.mimeType === 'multipart/form-data'){
      // not sure how unirest handles multipart
    }
  }
  if(this.source.postData.paramsObj.length){
    code.push(opts.indent + util.format('.send(%s)', this.source.postData.paramsObj));
  }
  code.push(opts.indent + '.end(function(response){')
  code.push(opts.indent + opts.indent + 'if (response.error) throw new Error(response.error);');
  code.push(null);
  code.push(opts.indent+opts.indent+ 'console.log(response.body);');
  code.push(opts.indent+'});');
  code.push(null);

  return code.join('\n');
};

module.exports.info = {
  key: 'unirest',
  title: 'Unirest',
  link: 'https://github.com/request/request',
  description: 'Simplified HTTP request client.'
};
