'use strict'

module.exports = {
  info: {
    key: '1.1',
    title: 'HTTP/1.1',
    extname: '',
    default: '1.1',
  },

  '1.1': require('./http1.1'),
}
