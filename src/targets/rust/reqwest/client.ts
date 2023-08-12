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
import { literalRepresentation } from "../helpers";


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
    const { push, blank, join, pushToLast, unshift } = new CodeBuilder({ indent: opts.indent });

    // import reqwest
    push('use reqwest;', indentLevel);
    blank();

    // start async main for tokio
    push('#[tokio::main]', indentLevel);
    push('pub async fn main() {', indentLevel);
    indentLevel += 1;

    // add url
    push(`let url = "${url}";`, indentLevel);
    blank();

    let hasQuery = false;
    // construct query string
    if (Object.keys(queryObj).length) {
      hasQuery = true;
      push("let querystring = [", indentLevel);
      indentLevel += 1;
      for (const [key, value] of Object.entries(queryObj)) {
        push(`("${key}", "${value}"),`, indentLevel);
      }
      indentLevel -= 1;
      push("];", indentLevel);
      blank();
    }

    // construct payload
    let payload: Record<string, any> = {};
    const files: Record<string, string> = {};

    let hasFiles = false;
    let hasForm = false;
    let hasBody = false;
    let jsonPayload = false;
    let isMultipart = false;
    switch (postData.mimeType) {
      case 'application/json':
        if (postData.jsonObj) {
          push(`let payload = ${literalRepresentation(postData.jsonObj, opts, indentLevel)};`, indentLevel);
        }
        jsonPayload = true;
        break;

      case 'multipart/form-data':
        isMultipart = true;

        if (!postData.params) {
          push(`let form = reqwest::multipart::Form::new()`, indentLevel);
          push(`.text("", "");`, indentLevel+1);
          break;
        }

        payload = {};
        postData.params.forEach(p => {
          if (p.fileName) {
            files[p.name] = p.fileName;
            hasFiles = true;
          } else {
            payload[p.name] = p.value;
          }
        })

        if (hasFiles) {
          for (let line of fileToPartString) {
            push(line, indentLevel);
          }
          blank();
        }
        push(`let form = reqwest::multipart::Form::new()`, indentLevel);

        for (const [name, fileName] of Object.entries(files)) {
          push(`.part("${name}", file_to_part("${fileName}").await)`, indentLevel + 1);
        }
        for (const [name, value] of Object.entries(payload)) {
          push(`.text("${name}", "${value}")`, indentLevel+1);
        }
        pushToLast(';');

        break;

      default: {
        if (postData.mimeType === 'application/x-www-form-urlencoded' && postData.paramsObj) {
          push(`let payload = ${literalRepresentation(postData.paramsObj, opts, indentLevel)};`, indentLevel)
          hasForm = true;
          break;
        }

        if (postData.text) {
          push(`let payload = ${literalRepresentation(postData.text, opts, indentLevel)};`, indentLevel)
          hasBody = true;
          break;
        }
      }
    }

    if (hasForm || jsonPayload || hasBody) {
      unshift(`use serde_json::json;`);
      blank();
    }

    let hasHeaders = false;
    // construct headers
    if (Object.keys(allHeaders).length) {
      hasHeaders = true;
      push("let mut headers = reqwest::header::HeaderMap::new();", indentLevel);
      for (const [key, value] of Object.entries(allHeaders)) {
        // Skip setting content-type if there is a file, as this header will
        // cause the request to hang, and reqwest will set it for us.
        if (key.toLowerCase() === 'content-type' && isMultipart) {
          continue;
        }
        push(`headers.insert("${key}", ${literalRepresentation(value, opts)}.parse().unwrap());`, indentLevel);
      }
      blank();
    }

    // construct client
    push('let client = reqwest::Client::new();', indentLevel);

    // construct query
    switch (method) {
      case 'POST':
        push(`let response = client.post(url)`, indentLevel);
        break;

      case 'GET':
        push(`let response = client.get(url)`, indentLevel);
        break;

      default: {
        push(`let response = client.request(reqwest::Method::from_str("${method}").unwrap(), url)`, indentLevel);
        unshift(`use std::str::FromStr;`);
        break;
      }
    }

    if (hasQuery) {
      push(`.query(&querystring)`, indentLevel+1)
    }

    if (isMultipart) {
      push(`.multipart(form)`, indentLevel+1);
    }

    if (hasHeaders) {
      push(`.headers(headers)`, indentLevel+1);
    }

    if (jsonPayload) {
      push(`.json(&payload)`, indentLevel+1);
    }

    if (hasForm) {
      push(`.form(&payload)`, indentLevel+1);
    }

    if (hasBody) {
      push(`.body(payload)`, indentLevel+1);
    }

    // send query
    push('.send()', indentLevel+1);
    push('.await;', indentLevel+1);
    blank();


    // Print response
    push("let results = response.unwrap()", indentLevel);
    push(".json::<serde_json::Value>()", indentLevel+1);
    push(".await", indentLevel+1);
    push(".unwrap();", indentLevel+1);
    blank();

    push("dbg!(results);", indentLevel);

    push('}\n');

    return join();
  }
}

const fileToPartString = [
`async fn file_to_part(file_name: &'static str) -> reqwest::multipart::Part {`,
`    let file = tokio::fs::File::open(file_name).await.unwrap();`,
`    let stream = tokio_util::codec::FramedRead::new(file, tokio_util::codec::BytesCodec::new());`,
`    let body = reqwest::Body::wrap_stream(stream);`,
`    reqwest::multipart::Part::stream(body)`,
`        .file_name(file_name)`,
`        .mime_str("text/plain").unwrap()`,
`}`
]
