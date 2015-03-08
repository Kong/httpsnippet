'use strict';

module.exports = require('requireindex')(__dirname);

module.exports._familyInfo = function () {
  return {
    key: 'objc',
    title: 'Objective-C',
    extname: '.m',
    default: 'native'
  };
};
