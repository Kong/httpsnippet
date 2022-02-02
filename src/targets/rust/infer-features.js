/**
 * @typedef {Object} Features
 * @property {bool} fullMethod Whether the request method should be written in full form
 * @property {bool} inlineMethod Whether the request method can be written in inline form
 * @property {bool} headers Whether the request has custom headers
 * @property {bool} query Whether the request has custom url query
 * @property {bool} raw Whether the request has post data of any type
 * @property {bool} form Whether the request has post data of type form
 * @property {bool} json Whether the request has post data of type json
 * @property {bool} body Whether the request has post data of other type
 */

/** Methods that can be inlined, e.g. `client.get(...)` */
const inlineMethods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH']
/** Methods that can not be inlined, so we should do this: client.request(Method::OPTIONS, ...) */
const fullMethods = ['OPTIONS', 'CONNECT', 'TRACE']

/**
 * @param {any} data
 * @returns {bool} If the value is truthy, and in case of object, has at least 1 key
 */
function isSet(data) {
  if (!data) return false
  if (typeof data !== 'object') return !!data
  return Object.keys(data).length > 0
}

/**
 *
 * @param {object} source HAR object processed by the library
 * @param {Options} options Options passed to the generator function
 * @returns {Features}
 */
function inferFeatures(source, options) {
  const fullMethod = fullMethods.includes(source.method)
  const inlineMethod = inlineMethods.includes(source.method)
  const headers = isSet(source.queryObj)
  const query = options.expandQuery && isSet(source.queryObj)
  const raw = isSet(source.postData.text)
  const form = options.expandBody && isSet(source.postData.paramsObj)
  const json = options.expandBody && isSet(source.postData.jsonObj)
  const body = !form && !json && raw

  return { fullMethod, inlineMethod, headers, query, raw, form, json, body }
}

module.exports = inferFeatures
