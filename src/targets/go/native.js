'use strict';

var util = require('util');

module.exports = function (options) {

  // Let's Go!
  var code = [];

  // Define Options
  var opts = util._extend({
    checkErrors: false,
    printBody: true
  }, options);

  // Set some shortcuts 
  var req = {
    url: this.source.fullUrl,
    method: this.source.method,
    hostname: this.source.uriObj.hostname,
    port: this.source.uriObj.port,
    path: this.source.uriObj.path,
    headers: this.source.headersObj
  };

  var bodyPresent = this.source.postData && this.source.postData.text;

  var errorPlaceholder = opts.checkErrors ? 'err' : '_';
  
  var errorCheck = function() {
    if (opts.checkErrors) {
      code.push('\tif err != nil {');
      code.push('\t\tpanic(err)');
      code.push('\t}');
    }
  };

  // Create boilerplate 
  code.push('package main\n');
  code.push('import (');
  code.push('\t"fmt"');
  if (bodyPresent) code.push('\t"strings"');
  code.push('\t"net/http"');
  if (opts.printBody) code.push('\t"io/ioutil"');
  code.push(')\n');

  code.push('func main() {');

  // Create client
  code.push('\tclient := &http.Client{}');
  code.push('\turl := "' + req.url + '"');

  // If we have body content or not create the var and reader or nil
  if (bodyPresent) {
    code.push('\tpayload := ' + JSON.stringify(this.source.postData.text));
    req.body = 'strings.NewReader(payload)';
  } else {
    req.body = 'nil';
  }

  code.push('\treq, ' + errorPlaceholder + ' := http.NewRequest("' + req.method + '", url, ' + req.body + ')');
  errorCheck();

  // Add headers
  var headersPresent = this.source.headers && this.source.headers.length;

  if (headersPresent) {
    for (var header in this.source.headers) {
      var key = this.source.headers[header].name;
      var val = this.source.headers[header].value;
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
  code.push('\tres, ' + errorPlaceholder + ' := client.Do(req)');
  errorCheck();

  // Get Body
  if (opts.printBody) code.push('\tdefer res.Body.Close()');
  if (opts.printBody) code.push('\tbody, ' + errorPlaceholder + ' := ioutil.ReadAll(res.Body)');
  errorCheck();

  // Print it
  code.push('\tfmt.Println(res)');

  if (opts.printBody) {
    code.push('\tfmt.Println(string(body))');
  }
  
  // End main block
  code.push('}');

  return code.join('\n');
};

module.exports.info = {
  key: 'native',
  title: 'NewRequest',
  link: 'http://golang.org/pkg/net/http/#NewRequest',
  description: 'Golang HTTP client request'
};
