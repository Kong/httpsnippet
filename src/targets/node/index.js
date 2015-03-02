'use strict';

module.exports = require('requireindex')(__dirname);

module.exports._familyInfo = function () {
  return {
    key: 'node',
    title: 'Node.JS',
    extname: '.js',
    default: 'native'
  };
};
