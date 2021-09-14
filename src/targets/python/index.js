module.exports = {
  info: {
    key: 'python',
    title: 'Python',
    extname: '.py',
    default: 'python3',
    cli: 'python3 %s',
  },

  python3: require('./python3'),
  requests: require('./requests'),
};
