'use strict'

module.exports = {
  info: {
    key: 'perl',
    title: 'Perl',
    extname: '.pl',
    default: 'perl5'
  },

  perl5: require('./perl5'),
}
