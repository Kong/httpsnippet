'use strict'

module.exports = {
  info: {
    key: 'js-variant',
    title: 'JavaScript Variant',
    extname: '.js',
    default: 'request'
  },

  request: require('../../src/targets/node/request')
}
