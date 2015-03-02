'use strict';

module.exports = require('requireindex')(__dirname);

module.exports._familyInfo = function () {
  return {
    key: 'php',
    title: 'PHP',
    extname: '.php',
    default: 'curl'
  };
};
