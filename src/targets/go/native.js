'use strict';

var util = require('util');

module.exports = function (source, options) {

  // Let's Go!
  var code = [];

  // Define Options
  var opts = util._extend({
    checkErrors: false,
    printBody: true,
    timeout: -1
  }, options);

  var errorPlaceholder = opts.checkErrors ? 'err' : '_';

  var errorCheck = function () {
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

  if (opts.timeout > 0) {
    code.push('\t"time"');
  }

  if (source.postData.text) {
    code.push('\t"strings"');
  }

  code.push('\t"net/http"');

  if (opts.printBody) {
    code.push('\t"io/ioutil"');
  }

  code.push(')\n');

  code.push('func main() {');

  // Create client
  if (opts.timeout > 0) {
    code.push('\tclient := http.Client{');
    code.push(util.format('\t\tTimeout: time.Duration(%s * time.Second),', opts.timeout));
    code.push('\t}');
  } else {
    code.push('\tclient := &http.Client{}');
  }

  code.push(util.format('\turl := "%s"', source.fullUrl));

  // If we have body content or not create the var and reader or nil
  if (source.postData.text) {
    code.push(util.format('\tpayload := strings.NewReader(%s)', JSON.stringify(source.postData.text)));
    code.push(util.format('\treq, %s := http.NewRequest("%s", url, payload)', errorPlaceholder, source.method));
    errorCheck();
  } else {
    code.push(util.format('\treq, %s := http.NewRequest("%s", url, nil)',  errorPlaceholder, source.method));
  }

  // Add headers
  Object.keys(source.allHeaders).map(function (key) {
    code.push(util.format('\treq.Header.Add("%s", "%s")', key, source.allHeaders[key]));
  });

  // Make request
  code.push(util.format('\tres, %s := client.Do(req)', errorPlaceholder));
  errorCheck();

  // Get Body
  if (opts.printBody) {
    code.push('\tdefer res.Body.Close()');
    code.push(util.format('\tbody, %s := ioutil.ReadAll(res.Body)', errorPlaceholder));
    errorCheck();
  }

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
