/**
 * @description
 * HTTP code snippet generator for native Go.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { Client } from '../..';
import { CodeBuilder } from '../../../helpers/code-builder';

export interface GoNativeOptions {
  showBoilerplate?: boolean,
  checkErrors?: boolean,
  printBody?: boolean,
  timeout?: number,
}

export const native: Client<GoNativeOptions> = {
  info: {
    key: 'native',
    title: 'NewRequest',
    link: 'http://golang.org/pkg/net/http/#NewRequest',
    description: 'Golang HTTP client request',
  },
  convert: (source, options) => {
    const { blank, push, join } = new CodeBuilder('\t');

    const opts = {
      showBoilerplate: true,
      checkErrors: false,
      printBody: true,
      timeout: -1,
      ...options,
    };

    const errorPlaceholder = opts.checkErrors ? 'err' : '_';

    const indent = opts.showBoilerplate ? 1 : 0;

    const errorCheck = () => {
      if (opts.checkErrors) {
        push('if err != nil {', indent);
        push('panic(err)', indent + 1);
        push('}', indent);
      }
    };

    // Create boilerplate
    if (opts.showBoilerplate) {
      push('package main');
      blank();
      push('import (');
      push('"fmt"', indent);

      if (opts.timeout > 0) {
        push('"time"', indent);
      }

      if (source.postData.text) {
        push('"strings"', indent);
      }

      push('"net/http"', indent);

      if (opts.printBody) {
        push('"io/ioutil"', indent);
      }

      push(')');
      blank();
      push('func main() {');
      blank();
    }

    // Create client
    let client;
    if (opts.timeout > 0) {
      client = 'client';
      push('client := http.Client{', indent);
      push(`Timeout: time.Duration(${opts.timeout} * time.Second),`, indent + 1);
      push('}', indent);
      blank();
    } else {
      client = 'http.DefaultClient';
    }

    push(`url := "${source.fullUrl}"`, indent)
    blank();

    // If we have body content or not create the var and reader or nil
    if (source.postData.text) {
      push(`payload := strings.NewReader(${JSON.stringify(source.postData.text)})`, indent);
      blank();
      push(`req, ${errorPlaceholder} := http.NewRequest("${source.method}", url, payload)`, indent);
      blank();
    } else {
      push(`req, ${errorPlaceholder} := http.NewRequest("${source.method}", url, nil)`, indent);
      blank();
    }

    errorCheck();

    // Add headers
    if (Object.keys(source.allHeaders).length) {
      Object.keys(source.allHeaders).forEach(function (key) {
        push(`req.Header.Add("${key}", "${source.allHeaders[key]}")`, indent);
      });

      blank();
    }

    // Make request
    push(`res, ${errorPlaceholder} := ${client}.Do(req)`, indent);
    errorCheck();

    // Get Body
    if (opts.printBody) {
      blank();
      push('defer res.Body.Close()', indent);
      push(`body, ${errorPlaceholder} := ioutil.ReadAll(res.Body)`, indent);
      errorCheck();
    }

    // Print it
    blank();
    push('fmt.Println(res)', indent);

    if (opts.printBody) {
      push('fmt.Println(string(body))', indent);
    }

    // End main block
    if (opts.showBoilerplate) {
      blank();
      push('}');
    }

    return join();
  },
};
