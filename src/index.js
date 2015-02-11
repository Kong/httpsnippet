'use strict';

var mapper = require('./mapper');
var url = require('url');

var curl = require('./targets/curl');
var php = require('./targets/php');
var wget = require('./targets/wget');

module.exports = function (req, lang, opts) {
  var targets = {
    curl: curl,
    php: php,
    wget: wget
  };

  // construct query string object
  req.queryObj = {};
  req.headersObj = {};

  // construct query objects
  if (req.queryString && req.queryString.length) {
    req.queryString.map(mapper(req.queryObj));
  }

  // construct headers objects
  if (req.headers && req.headers.length) {
    req.headers.map(mapper(req.headersObj));
  }

  // deconstruct and reset the uri
  req.uriObj = url.parse(req.url);

  // reset the query string
  req.uriObj.query = req.queryObj;
  req.url = url.format(req.uriObj);

  return targets[lang].call(lang, req, opts);
};
