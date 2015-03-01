'use strict';

var util = require('util');

module.exports = function (options) {
  var opts = util._extend({
    indent: '    ',
    noTags: false,
    closingTag: false
  }, options);

  var code = [];

  if (!opts.noTags) {
    code.push('<?php');
  }

  code.push('$curl = curl_init();');

  var curlOptions = [{
    escape: true,
    name: 'CURLOPT_port',
    value: this.source.uriObj.port
  }, {
    escape: true,
    name: 'CURLOPT_URL',
    value: this.source.url
  }, {
    escape: false,
    name: 'CURLOPT_RETURNTRANSFER',
    value: 'true'
  }, {
    escape: false,
    name: 'CURLOPT_HTTP_VERSION',
    value: this.source.httpVersion === 'HTTP/1.0' ? 'CURL_HTTP_VERSION_1_0' : 'CURL_HTTP_VERSION_1_1'
  }, {
    escape: true,
    name: 'CURLOPT_CUSTOMREQUEST',
    value: this.source.method
  }, {
    escape: true,
    name: 'CURLOPT_POSTFIELDS',
    value: this.source.postData ? this.source.postData.text : undefined
  }];

  code.push('curl_setopt_array($curl, array(');

  var curlopts = [];

  curlOptions.map(function (option) {
    if (option.value) {
      curlopts.push(util.format('%s => %s,', option.name, option.escape ? JSON.stringify(option.value) : option.value));
    }
  });

  // construct cookies
  if (this.source.cookies && this.source.cookies.length) {
    var cookies = this.source.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    curlopts.push(util.format('CURLOPT_COOKIE => "%s",', cookies.join('; ')));
  }

  // construct cookies
  if (this.source.headers && this.source.headers.length) {
    var headers = this.source.headers.map(function (header) {
      return util.format('"%s: %s"', header.name, header.value);
    });

    curlopts.push(util.format('CURLOPT_HTTPHEADER => array(\n\t\t%s\n\t),', headers.join(',\n\t\t')));
  }

  code.push('\t' + curlopts.join('\n\t'));

  code.push('));');
  code.push('$response = curl_exec($curl);');
  code.push('curl_close($curl);');

  if (opts.closingTag) {
    code.push('?>');
  }

  return code.join('\n');
};
