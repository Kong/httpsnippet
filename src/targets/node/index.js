module.exports = {
  info: {
    key: 'node',
    title: 'Node.js',
    extname: '.js',
    default: 'native',
    cli: 'node %s',
  },

  native: require('./native'),
  request: require('./request'),
  unirest: require('./unirest'),
  axios: require('./axios'),
  fetch: require('./fetch'),
};
