'use strict';

var util = require('util');

module.exports = function (options) {

  var opts = util._extend({
    errorChecking: false,
    timeout: -1,
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

  // Let's Go!
  var code = [];

  // Create boilerplate 
  code.push('package main\n');
  code.push('import (');
  code.push('\t"fmt"');
  if (bodyPresent) code.push('\t"strings"');
  code.push('\t"net/http"');
  code.push('\t"io/ioutil"');
  code.push(')\n');

  code.push('func main() {');

  // Create client
  code.push('\tclient := &http.Client{}');
  code.push('\turl := "' + req.url + '"');

  // If we have body content or not create the var and reader or nil
  if (bodyPresent) {
    code.push('\tbody := ' + JSON.stringify(this.source.postData.text));
    req.body = 'strings.NewReader(body)';
  } else {
    req.body = 'nil';
  }

  code.push('\treq, _ := http.NewRequest("' + req.method + '", url, ' + req.body + ')');

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
  code.push('\tres, _ := client.Do(req)');

  // Get Body
  code.push('\tdefer res.Body.Close()');
  code.push('\tbody, _ := ioutil.ReadAll(res.Body)');

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
