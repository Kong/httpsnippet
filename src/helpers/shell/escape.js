'use strict'

module.exports = function (value) {
  return value.replace(/\r/g, '\\r').replace(/\n/g, '\\n')
}
