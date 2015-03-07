'use strict';

module.exports = require('requireindex')(__dirname);

module.exports._familyInfo = function () {
  return {
    key: 'ocaml',
    title: 'OCaml',
    extname: '.ml',
    default: 'cohttp'
  };
};
