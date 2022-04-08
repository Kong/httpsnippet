module.exports = {
  info: {
    key: 'js-variant',
    title: 'JavaScript Variant',
    extname: '.js',
    default: 'request',
  },

  request: require('../targets/node/request/client'),
};
