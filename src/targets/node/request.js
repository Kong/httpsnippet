'use strict';

var util = require('util');
var path = require('path');

module.exports = function (options) {
  var opts = util._extend({
    indent: '  '
  }, options);

  var code = ['var request = require("request");', null];

  var reqOpts = {
    method: this.source.method,
    url: this.source.url
  };

  if (Object.keys(this.source.queryObj).length) {
    reqOpts.qs = this.source.queryObj;
  }

  if (Object.keys(this.source.headersObj).length) {
    reqOpts.headers = this.source.headersObj;
  }

  var includeFS = false;

  switch (this.source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      reqOpts.form = this.source.postData.paramsObj;
      break;

    case 'application/json':
      reqOpts.body = this.source.postData.jsonObj;
      reqOpts.json = true;
      break;

    case 'multipart/form-data':
      reqOpts.formData = {};

      this.source.postData.params.forEach(function (param) {
        var attachement = {};

        if (param.value) {
          attachement.value = param.value;
        } else if (param.fileName) {
          includeFS = true;
          attachement.value = 'fs.createReadStream("' + param.fileName + '")';
        }

        if (param.fileName) {
          var base = path.parse(param.fileName).base;

          attachement.options = {
            filename: base.length ? base : 'filename',
            contentType: param.contentType ? param.contentType : null
          };
        }

        reqOpts.formData[param.name] = attachement;
      });
      break;

    default:
      reqOpts.body = this.source.postData.text;
  }

  // construct cookies argument
  if (this.source.cookies.length) {
    reqOpts.jar = 'JAR';

    code.push(null);
    code.push('var jar = request.jar();');

    var url = this.source.url;

    this.source.cookies.map(function (cookie) {
      code.push(util.format('jar.setCookie(request.cookie("%s=%s"), "%s");', encodeURIComponent(cookie.name), encodeURIComponent(cookie.value), url));
    });
    code.push(null);
  }


  if (includeFS) {
    code.push('var fs = require("fs");');
  }

  var content = JSON.stringify(reqOpts, null, opts.indent)
    .replace('"JAR"', 'jar')
    .replace(/"fs\.createReadStream\(\\\"(.+)\\\"\)\"/, 'fs.createReadStream("$1")');

  code.push(util.format('request(%s, %s', content, 'function (error, response, body) {'));
  code.push(opts.indent + 'if (error) throw new Error(error);');
  code.push(null);
  code.push(opts.indent + 'console.log(body);');
  code.push('});');
  code.push(null);

  return code.join('\n');
};

module.exports.info = {
  key: 'request',
  title: 'Request',
  link: 'https://github.com/request/request',
  description: 'Simplified HTTP request client'
};
