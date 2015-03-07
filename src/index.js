'use strict';

var debug = require('debug')('httpsnippet');
var mapper = require('./mapper');
var qs = require('querystring');
var targets = require('./targets');
var url = require('url');
var validate = require('har-validator');
var util = require('util');

// constructor
var HTTPSnippet = function (req, lang) {
  this.source = util._extend({}, req);

  // add optional properties to make validation successful
  this.source.httpVersion = this.source.httpVersion || 'HTTP/1.1';
  this.source.queryString = this.source.queryString || [];
  this.source.headers = this.source.headers || [];
  this.source.cookies = this.source.cookies || [];
  this.source.postData = this.source.postData || {};
  this.source.postData.mimeType = this.source.postData.mimeType || 'application/x-www-form-urlencoded';

  this.source.bodySize = 0;
  this.source.headersSize = 0;
  this.source.postData.size = 0;

  validate.request(this.source, function (err, valid) {
    if (!valid) {
      throw err;
    }

    // construct query string object
    this.source.queryObj = {};
    this.source.headersObj = {};

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
  }.bind(this));
};

HTTPSnippet.prototype.getSource = function () {
  return this.source;
};

HTTPSnippet.prototype.convert = function (family, target, opts) {
  if (!opts && target) {
    opts = target;
  }

  var func = this._matchTarget(family, target);

  if (func) {
    return func.call(this, opts);
  }

  return false;
};

HTTPSnippet.prototype._matchTarget = function (familyName, target) {
  // does it exist?
  if (targets[familyName] === undefined) {
    return false;
  }

  // isolate the family
  var family = targets[familyName];

  // childless targets
  if (typeof family === 'function') {
    return family;
  }

  // find the first default target
  var defaultTarget = family._familyInfo().default;

  // shorthand
  if (!target || typeof target === 'object') {
    target = defaultTarget;
  }

  // asking for a particular target
  if (typeof target === 'string') {
    // attempt to call the first one we find
    if (typeof family[target] !== 'function') {
      target = defaultTarget;
    }

    // last chance
    if (typeof family[target] === 'function') {
      return family[target];
    }
  }

  return false;
};

// exports

module.exports = HTTPSnippet;

module.exports._targets = function () {
  return Object.keys(targets);
};

module.exports._familyInfo = function (family) {
  if (targets[family] && targets[family]._familyInfo) {
    return targets[family]._familyInfo();
  }

  return false;
};

module.exports.info = function (family, target) {
  if (!targets[family]) {
    return false;
  }

  if (typeof targets[family] === 'function') {
    return targets[family].info();
  }

  // get all info for all family members
  if (!target && typeof targets[family] === 'object') {
    var results = {
      family: family
    };

    results.members = Object.keys(targets[family])
      .filter(function (key) {
        return key !== '_familyInfo';
      })

      .map(function (target) {
        var info = targets[family][target].info();

        delete info.family;

        return info;
      });

    return results;
  }

  if (typeof targets[family] === 'object' && typeof targets[family][target] === 'function') {
    return targets[family][target].info();
  }
};

module.exports.extname = function (family, target) {
  if (!targets[family]) {
    return '';
  }

  if (typeof targets[family] === 'function') {
    return targets[family].info().extname;
  }

  // get all info for all family members
  if (!target && typeof targets[family] === 'object') {
    return targets[family]._familyInfo().extname;
  }
};
