/**
 * @description
 * HTTP code snippet generator for native Go.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  // Let's Go!
  var code = new CodeBuilder('\t')

  // Define Options
  var opts = util._extend({
    checkErrors: false,
    printBody: true,
    timeout: -1
  }, options)

  var errorPlaceholder = opts.checkErrors ? 'err' : '_'

  var errorCheck = function () {
    if (opts.checkErrors) {
      code.push('\tif err != nil {')
          .push('\t\tpanic(err)')
          .push('\t}')
    }
  }

  // Create boilerplate
  code.push('package main\n')
      .push('import (')
      .push(1, '"fmt"')

  if (opts.timeout > 0) {
    code.push(1, '"time"')
  }

  if (source.postData.text) {
    code.push(1, '"strings"')
  }

  code.push(1, '"net/http"')

  if (opts.printBody) {
    code.push(1, '"io/ioutil"')
  }

  code.push(')\n')
      .push('func main() {\n')

  // Create client
  var client
  if (opts.timeout > 0) {
    client = 'client'
    code.push(1, 'client := http.Client{')
        .push(2, util.format('Timeout: time.Duration(%s * time.Second),', opts.timeout))
        .push(1, '}\n')
  } else {
    client = 'http.DefaultClient'
  }

  code.push(1, util.format('url := "%s"\n', source.fullUrl))

  // If we have body content or not create the var and reader or nil
  if (source.postData.text) {
    code.push(1, util.format('payload := strings.NewReader(%s)\n', JSON.stringify(source.postData.text)))
        .push(1, util.format('req, %s := http.NewRequest("%s", url, payload)\n', errorPlaceholder, source.method))
  } else {
    code.push(1, util.format('req, %s := http.NewRequest("%s", url, nil)\n', errorPlaceholder, source.method))
  }

  errorCheck()

  // Add headers
  if (Object.keys(source.allHeaders).length) {
    Object.keys(source.allHeaders).map(function (key) {
      code.push(1, util.format('req.Header.Add("%s", "%s")', key, source.allHeaders[key]))
    })
    code.blank()
  }

  // Make request
  code.push(1, util.format('res, %s := %s.Do(req)', errorPlaceholder, client))
  errorCheck()

  // Get Body
  if (opts.printBody) {
    code.blank()
        .push(1, 'defer res.Body.Close()')
        .push(1, util.format('body, %s := ioutil.ReadAll(res.Body)', errorPlaceholder))
    errorCheck()
  }

  // Print it
  code.blank()
      .push(1, 'fmt.Println(res)')

  if (opts.printBody) {
    code.push(1, 'fmt.Println(string(body))')
  }

  // End main block
  code.blank()
      .push('}')

  return code.join()
}

module.exports.info = {
  key: 'native',
  title: 'NewRequest',
  link: 'http://golang.org/pkg/net/http/#NewRequest',
  description: 'Golang HTTP client request'
}
