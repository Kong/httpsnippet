'use strict';

var debug = require('debug')('httpsnippet');
var mapper = require('./mapper');
var qs = require('querystring');
var targets = require('./targets');
var url = require('url');
var util = require('util');

// constructor
var HTTPSnippet = function (req, lang) {
  this.source = util._extend({}, req);

  // construct query string object
  this.source.queryObj = {};
  this.source.headersObj = {};

  if (this.source.url === undefined) {
    throw new Error('a request url is required');
  }

  // construct query objects
  if (this.source.queryString && this.source.queryString.length) {
    debug('queryString found, constructing queryString pair map');

    this.source.queryString.map(mapper(this.source.queryObj));
  }

  // construct headers objects
  if (this.source.headers && this.source.headers.length) {
    debug('headers found, constructing header pair map');

    this.source.headers.map(mapper(this.source.headersObj));
  }

  // deconstruct the uri
  this.source.uriObj = url.parse(this.source.url, true, true);

  // merge all possible queryString values
  this.source.queryString = util._extend(this.source.uriObj.query, this.source.queryObj);

  // reset uriObj values for a clean url
  this.source.uriObj.query = null;
  this.source.uriObj.search = null;
  this.source.uriObj.path = this.source.uriObj.pathname;

  // keep the base url clean of queryString
  this.source.url = url.format(this.source.uriObj);

  // update the uri object
  this.source.uriObj.query = this.source.queryString;
  this.source.uriObj.search = qs.stringify(this.source.queryString);
  this.source.uriObj.path = this.source.uriObj.pathname + '?' + this.source.uriObj.search;

  // construct a full url
  this.source.fullUrl = url.format(this.source.uriObj);
};

HTTPSnippet.prototype.getSource = function () {
  return this.source;
};

HTTPSnippet.prototype.convert = function (familyName, target, opts) {
  if (!opts && target) {
    opts = target;
  }

  // does it exist?
  if (targets[familyName] === undefined) {
    return false;
  }

  // isolate the family
  var family = targets[familyName];

  // childless targets
  if (typeof family === 'function') {
    return family.call(this, opts);
  }

  // find the first possibel target
  var firstTarget = Object.keys(family).pop();

  // shorthand
  if (typeof target === 'object') {
    target = firstTarget;
  }

  // asking for a particular target
  if (typeof target === 'string') {
    // attempt to call the first one we find
    if (typeof family[target] !== 'function') {
      target = firstTarget;
    }

    // last chance
    if (typeof family[target] === 'function') {
      return family[target].call(this, opts);
    }
  }

  return false;
};

// exports

module.exports = HTTPSnippet;

module.exports._targets = function () {
  return Object.keys(targets);
};

module.exports.info = function (lang) {
  return targets[lang].info();
};
