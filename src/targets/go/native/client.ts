/**
 * @description
 * HTTP code snippet generator for native Go.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import type { Client } from '../..';

import { CodeBuilder } from '../../../helpers/code-builder';
import { escapeForDoubleQuotes } from '../../../helpers/escape';

export interface GoNativeOptions {
  checkErrors?: boolean;
  printBody?: boolean;
  showBoilerplate?: boolean;
  timeout?: number;
}

export const native: Client<GoNativeOptions> = {
  info: {
    key: 'native',
    title: 'NewRequest',
    link: 'http://golang.org/pkg/net/http/#NewRequest',
    description: 'Golang HTTP client request',
  },
  convert: ({ postData, method, allHeaders, fullUrl }, options = {}) => {
    const { blank, push, join } = new CodeBuilder({ indent: '\t' });

    const { showBoilerplate = true, checkErrors = false, printBody = true, timeout = -1 } = options;

    const errorPlaceholder = checkErrors ? 'err' : '_';

    const indent = showBoilerplate ? 1 : 0;

    const errorCheck = () => {
      if (checkErrors) {
        push('if err != nil {', indent);
        push('panic(err)', indent + 1);
        push('}', indent);
      }
    };

    // Create boilerplate
    if (showBoilerplate) {
      push('package main');
      blank();
      push('import (');
      push('"fmt"', indent);

      if (timeout > 0) {
        push('"time"', indent);
      }

      if (postData.text) {
        push('"strings"', indent);
      }

      push('"net/http"', indent);

      if (printBody) {
        push('"io"', indent);
      }

      push(')');
      blank();
      push('func main() {');
      blank();
    }

    // Create client
    const hasTimeout = timeout > 0;
    const hasClient = hasTimeout;
    const client = hasClient ? 'client' : 'http.DefaultClient';

    if (hasClient) {
      push('client := http.Client{', indent);

      if (hasTimeout) {
        push(`Timeout: time.Duration(${timeout} * time.Second),`, indent + 1);
      }

      push('}', indent);
      blank();
    }

    push(`url := "${fullUrl}"`, indent);
    blank();

    // If we have body content or not create the var and reader or nil
    if (postData.text) {
      push(`payload := strings.NewReader(${JSON.stringify(postData.text)})`, indent);
      blank();
      push(`req, ${errorPlaceholder} := http.NewRequest("${method}", url, payload)`, indent);
      blank();
    } else {
      push(`req, ${errorPlaceholder} := http.NewRequest("${method}", url, nil)`, indent);
      blank();
    }

    errorCheck();

    // Add headers
    if (Object.keys(allHeaders).length) {
      Object.keys(allHeaders).forEach(key => {
        push(`req.Header.Add("${key}", "${escapeForDoubleQuotes(allHeaders[key])}")`, indent);
      });

      blank();
    }

    // Make request
    push(`res, ${errorPlaceholder} := ${client}.Do(req)`, indent);
    errorCheck();

    // Get Body
    if (printBody) {
      blank();
      push('defer res.Body.Close()', indent);
      push(`body, ${errorPlaceholder} := io.ReadAll(res.Body)`, indent);
      errorCheck();
    }

    // Print it
    blank();

    if (printBody) {
      push('fmt.Println(string(body))', indent);
    }

    // End main block
    if (showBoilerplate) {
      blank();
      push('}');
    }

    return join();
  },
};
