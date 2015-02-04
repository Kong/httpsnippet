'use strict';

var targets = {
  curl: require('./targets/curl.js'),
  php: require('./targets/php.js')
};

module.exports = function (req, lang, opts) {
  var target = targets[lang];

  return target.call(target, req, opts);
}
