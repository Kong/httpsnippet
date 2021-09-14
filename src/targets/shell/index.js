module.exports = {
  info: {
    key: 'shell',
    title: 'Shell',
    extname: '.sh',
    default: 'curl',
    cli: '%s',
  },

  curl: require('./curl'),
  httpie: require('./httpie'),
  wget: require('./wget'),
};
