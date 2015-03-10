'use strict';

var util = require('util');

module.exports = function (options) {
  var opts = util._extend({
    indent: '  '
  }, options);

  // Set helper object for later
  var req = {
    url: this.source.fullUrl,
    method: this.source.method,
    hostname: this.source.uriObj.hostname,
    port: this.source.uriObj.port,
    path: this.source.uriObj.path,
    headers: this.source.headersObj
  };

  // Find out if we have body content or not
  var bodyPresent = this.source.postData && this.source.postData.text;
  if (bodyPresent) {
    req.body = 'strings.NewReader(' + JSON.stringify(this.source.postData.text) + ')';
  } else {
    req.body = "nil";
  }

  // Start writing code out
  var code = [];

  // Create boilerplate 
  code.push('package main\n');
  code.push('import (');
  code.push('\t"fmt"');
  if (bodyPresent) code.push('\t"strings"');
  code.push('\t"net/http"');
  code.push(')\n');

  code.push('func main() {')

  // Create client
  code.push('\tclient := &http.Client{}');
  code.push('\treq, _ := http.NewRequest("' + req.method + '", "' + req.url + '", ' + req.body + ')');

  // Add headers
  var headersPresent = this.source.headers && this.source.headers.length;

  if (headersPresent) {
    for (var header in this.source.headers) {
      var key = this.source.headers[header].name
      var val = this.source.headers[header].value
      code.push('\treq.Header.Add("' + key + '", "' + val + '")');
    }
  }

  // Add Cookies
  var cookiesPresent = this.source.cookies && this.source.cookies.length;
  if (cookiesPresent) {
    var cookies = this.source.cookies.map(function (cookie) {
      return cookie.name + '=' + cookie.value;
    }).join('; ');
    code.push('\treq.Header.Add("Cookie", "' + cookies + '")');
  }

  // Make request 
  code.push('\tres, _ := client.Do(req)');

  // Print it
  code.push('\tfmt.Printf("%+v", res)');

  // End main block
  code.push('}')

  return code.join('\n');
};

module.exports.info = {
  key: 'native',
  title: 'NewRequest',
  link: 'http://golang.org/pkg/net/http/#NewRequest',
  description: 'Golang HTTP client request'
};
