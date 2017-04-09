'use strict'

module.exports = {
  info: {
    key: 'javascript',
    title: 'JavaScript',
    extname: '.js',
    default: 'xhr'
  },

  jquery: require('./jq'),
  xhr: require('./xhr')
}
