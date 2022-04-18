module.exports = {
  info: {
    key: 'python',
    title: 'Python',
    extname: '.py',
    default: 'requests',
    cli: 'python3 %s',
  },

  requests: require('./requests'),
};
