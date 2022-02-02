/**
 * @description
 * HTTP code snippet generator for Rust using Reqwest
 *
 * @author
 * @eeWynell
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

/**
 * @typedef {Object} Options
 * @property {bool} blocking Whether the request should be blocking
 * @property {bool} boilerplate Whether to show boilerplate code
 * @property {bool} print Whether to print the response
 * @property {bool} expandQuery Whether to expand the url query
 * @property {bool} expandBody Whether to expand the body
 */

'use strict'

const str = require('./str')
const inferFeatures = require('./infer-features')
const CodeBuilder = require('./code-builder')

/**
 * @param {object} source
 * @param {Options} options
 * @returns {string} Code
 */
module.exports = function (source, options) {
  options = Object.assign(
    {
      blocking: true,
      boilerplate: true,
      print: true,
      expandQuery: false,
      expandBody: true,
    },
    options
  )

  const features = inferFeatures(source, options)
  const code = new CodeBuilder()

  if (options.boilerplate) {
    if (options.blocking) code.push('use reqwest::blocking::Client;')
    else code.push('use tokio;').push('use reqwest::Client;')

    if (features.fullMethod) code.push('reqwest::Client')
    if (features.headers) code.push('use reqwest::header::HeaderMap;')
    if (features.json) code.push('use serde_json::json;')
    if (features.query || features.form) code.push('use maplit::hashmap;')

    code.blank()
    if (options.blocking) code.push('fn main() {')
    else code.push('#[tokio::main]').push('async fn main() {')
    code.indent()
  }

  code.push('let client = Client::new();').blank()

  if (features.headers) {
    code.push('let mut headers = HeaderMap::new();')
    for (const [name, value] of Object.entries(source.headersObj)) {
      code.push(str`headers.insert("${name}", "${value}".parse().unwrap());`)
    }
    code.blank()
  }

  if (features.query) {
    code.push('let query = hashmap!{').indent()
    for (const [name, value] of Object.entries(source.queryObj)) {
      code.push(str`"${name}" => vec!${[].concat(value)},`)
    }
    code.unindent().push('};').blank()
  }

  if (features.form) {
    code.push('let form = hashmap!{').indent()
    for (const [name, value] of Object.entries(source.postData.paramsObj)) {
      code.push(str`"${name}" => vec!${[].concat(value)},`)
    }
    code.unindent().push('};').blank()
  }

  if (features.json) {
    code.push(str`let json = json!("${source.postData.jsonObj}");`).blank()
  }

  if (features.body) {
    code.push(str`let body = "${source.postData.text}";`).blank()
  }

  code.push('let resp = client').indent()

  const method = source.method
  const url = options.expandQuery ? source.url : source.fullUrl

  if (features.inlineMethod) code.push(`.${method.toLowerCase()}("${url}")`)
  else if (features.fullMethod) code.push(`.request(Method::${method})`)
  else code.push(`.post("${url}") //! Can't use method "${method}"`)

  if (features.headers) code.push('.headers(headers)')
  if (features.query) code.push('.query(&query)')
  if (features.form) code.push('.form(&form)')
  if (features.json) code.push('.json(&json)')
  if (features.body) code.push('.body(body)')

  if (options.blocking) code.push('.send()').push('.unwrap();')
  else code.push('.send()').push('.await').push('.unwrap();')

  code.unindent()

  if (options.print) {
    code.blank().push('println!("{:?}", resp);')
  }

  if (options.boilerplate) {
    code.unindent().push('}').blank()
  }

  return code.join()
}

module.exports.info = {
  key: 'reqwest',
  title: 'Reqwest',
  link: 'https://docs.rs/reqwest/',
  description: 'HTTP Request using Reqwest library for Rust',
}
