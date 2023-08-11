/**
 * @description
 * HTTP code snippet generator for Rust using reqwest
 *
 * @author
 * @Benjscho
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { CodeBuilder } from "../../../helpers/code-builder";
import { Client } from "../../targets";


export const reqwest: Client =  {
  info: {
    key: 'reqwest',
    title: 'reqwest',
    link: 'https://docs.rs/reqwest/latest/reqwest/',
    description: 'reqwest HTTP library',
  },
  convert: ({ queryObj, url, postData, allHeaders, method }, options) => {
    const opts = {
      indent: '    ',
      pretty: true,
      ...options
    };

    let indentLevel = 0;

    // start snippet
    const { push, blank, join } = new CodeBuilder({ indent: opts.indent });

    // import reqwest
    push('use reqwest;', indentLevel);
    blank();

    // start async main for tokio
    push('#[tokio::main]', indentLevel);
    push('async fn main() {', indentLevel);
    indentLevel += 1;

    // add url
    push(`let url = "${url}";`, indentLevel);
    blank();

    // construct query string
    if (Object.keys(queryObj).length) {
      push("let queryString = [", indentLevel);
      indentLevel += 1;
      for (const [q, value] of Object.entries(queryObj)) {
        push(`("${q}", "${value}")`, indentLevel);
      }
      indentLevel -= 1;
      push("];", indentLevel);
      blank();
    }

    // construct headers

    // construct query
    push('let client = Client::new();', indentLevel);
    blank();

    switch (method) {
      case 'POST':
        push(`let response = client.post(url)`, indentLevel);
        break;

      case 'GET':
        push(`let response = client.get(url)`, indentLevel);
        break;

      default: {
        push(`let response = client.request(reqwest::Method::from_str("${method}"), url)`, indentLevel);
        break;
      }
    }


    // Print response
    push("let results = response.unwrap()", indentLevel);
    push(".json::<serde_json::Value>()", indentLevel+1);
    push(".await", indentLevel+1);
    push(".unwrap();", indentLevel+1);
    blank();

    push("dbg!(results);", indentLevel);
    blank();

    push('}');

    return join();
  }
}
