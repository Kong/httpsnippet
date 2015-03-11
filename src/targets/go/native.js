'use strict';

var util = require('util');

module.exports = function (source, options) {
  // Let's Go!
  var code = [];

  // Define Options
  var opts = util._extend({
    checkErrors: false,
    printBody: true
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
  code.push('\tclient := &http.Client{}');
  code.push(util.format('\turl := "%s"', source.fullUrl));

  // If we have body content or not create the var and reader or nil
  if (source.postData.text) {
    code.push('\tpayload := ' + JSON.stringify(source.postData.text));
    code.push(util.format('\treq, ' + errorPlaceholder + ' := http.NewRequest("%s", url, strings.NewReader(payload))', source.method));
  } else {
    code.push(util.format('\treq, %s := http.NewRequest("%s", url, nil)',  errorPlaceholder, source.method));
  }

  errorCheck();

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
  }

  if (opts.printBody) {
    code.push(util.format('\tbody, %s := ioutil.ReadAll(res.Body)', errorPlaceholder));
  }

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
