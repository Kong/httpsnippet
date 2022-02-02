/**
 * Turns data into a string, without adding quotes
 * 
 * @param {any} data Any data to be stringified
 * @returns {string}
 */
function stringify(data) {
  if (typeof data === 'object') return JSON.stringify(data)
  return String(data)
}

/**
 * Escapes characters in the given string
 * 
 * @param {string} data String to escape
 * @returns {string}
 */
function escape(data) {
  return JSON.stringify(data).slice(1, -1)
}

/**
 * Looks like a reason to use a ES6 tag function first time in my life
 * Also if you replace `parts` with `parts.raw`, you will avoid escaping characters in the template
 *
 * @example
 * let test = { "foo": "bar" }
 * str`unquoted ${test}, quoted "${test}"`
 * // unquoted {"foo":"bar"}, quoted "{\"foo\":\"bar\"}"
 *
 * @param {string[]} parts Template literal string parts
 * @param {...string} args Template literal expressions
 *
 * @returns {string} The same string but expressions are JSON-stringified
 */
function str(parts, ...args) {
  let [res, ...rest] = parts
  for (i = 0; i < rest.length; i++) {
    let expr = stringify(args[i])
    let nextTmpl = rest[i]
    if (res.endsWith('"') && nextTmpl.startsWith('"')) {
      expr = escape(expr)
    }
    res += expr + nextTmpl
  }
  return res
}

module.exports = str