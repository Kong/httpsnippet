const util = require('util')

function quote (value) {
  if (typeof value !== 'string') value = JSON.stringify(value)
  return JSON.stringify(value)
}

function escape (value) {
  const q = quote(value)
  return q && q.slice(1, -1)
}

/**
 * Wraps the `util.format` function and adds the %q and %v format options,
 * where `%q` - escape tricky characters, like newline or quotes
 * and `%v` - JSON-stringify-if-necessary
 * 
 * @param {string} value
 * @param  {...string} format
 * 
 * @example
 * format('foo("%q")', { bar: 'baz' })
 * // output: foo("{\"bar\":\"baz\"}")
 * 
 * format('foo(%v)', { bar: 'baz' })
 * // output: foo({"bar":"baz"})
 * 
 * @returns {string} Formatted string
 */
function format (value, ...format) {
  if (typeof value !== 'string') return ''

  let i = 0
  value = value.replace(/(?<!%)%[sdifjoOcqv]/g, (m) => {
    // JSON-stringify
    if (m === '%v') {
      const [elem] = format.splice(i, 1)
      return JSON.stringify(elem)
    }
    // JSON-stringify, remove quotes (means, escape)
    if (m === '%q') {
      const [elem] = format.splice(i, 1)
      return escape(elem)
    }
    i += 1
    return m
  })

  const ret = util.format(value, ...format)
  return ret
}

module.exports = format
