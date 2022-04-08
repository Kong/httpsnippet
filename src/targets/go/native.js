/**
 * @description
 * HTTP code snippet generator for native Go.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const CodeBuilder = require('../../helpers/code-builder');

module.exports = function (source, options) {
  // Let's Go!
  const code = new CodeBuilder('\t');

  // Define Options
  const opts = Object.assign(
    {
      showBoilerplate: true,
      checkErrors: false,
      printBody: true,
      timeout: -1,
    },
    options,
  );

  const errorPlaceholder = opts.checkErrors ? 'err' : '_';

  const indent = opts.showBoilerplate ? 1 : 0;

  const errorCheck = function () {
    if (opts.checkErrors) {
      code
        .push(indent, 'if err != nil {')
        .push(indent + 1, 'panic(err)')
        .push(indent, '}');
    }
  };

  // Create boilerplate
  if (opts.showBoilerplate) {
    code.push('package main').blank().push('import (').push(indent, '"fmt"');

    if (opts.timeout > 0) {
      code.push(indent, '"time"');
    }

    if (source.postData.text) {
      code.push(indent, '"strings"');
    }

    code.push(indent, '"net/http"');

    if (opts.printBody) {
      code.push(indent, '"io/ioutil"');
    }

    code.push(')').blank().push('func main() {').blank();
  }

  // Create client
  let client;
  if (opts.timeout > 0) {
    client = 'client';
    code
      .push(indent, 'client := http.Client{')
      .push(indent + 1, `Timeout: time.Duration(${opts.timeout} * time.Second),`)
      .push(indent, '}')
      .blank();
  } else {
    client = 'http.DefaultClient';
  }

  code.push(indent, `url := "${source.fullUrl}"`).blank();

  // If we have body content or not create the var and reader or nil
  if (source.postData.text) {
    code
      .push(indent, `payload := strings.NewReader(${JSON.stringify(source.postData.text)})`)
      .blank()
      .push(indent, `req, ${errorPlaceholder} := http.NewRequest("${source.method}", url, payload)`)
      .blank();
  } else {
    code.push(indent, `req, ${errorPlaceholder} := http.NewRequest("${source.method}", url, nil)`).blank();
  }

  errorCheck();

  // Add headers
  if (Object.keys(source.allHeaders).length) {
    Object.keys(source.allHeaders).forEach(function (key) {
      code.push(indent, `req.Header.Add("${key}", "${source.allHeaders[key]}")`);
    });

    code.blank();
  }

  // Make request
  code.push(indent, `res, ${errorPlaceholder} := ${client}.Do(req)`);
  errorCheck();

  // Get Body
  if (opts.printBody) {
    code.blank().push(indent, 'defer res.Body.Close()').push(indent, `body, ${errorPlaceholder} := ioutil.ReadAll(res.Body)`);
    errorCheck();
  }

  // Print it
  code.blank().push(indent, 'fmt.Println(res)');

  if (opts.printBody) {
    code.push(indent, 'fmt.Println(string(body))');
  }

  // End main block
  if (opts.showBoilerplate) {
    code.blank().push('}');
  }

  return code.join();
};

module.exports.info = {
  key: 'native',
  title: 'NewRequest',
  link: 'http://golang.org/pkg/net/http/#NewRequest',
  description: 'Golang HTTP client request',
};
