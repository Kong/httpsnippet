'use strict';

var debug = require('debug')('httpsnippet');
var reducer = require('./reducer');
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

      this.source.queryObj = this.source.queryString.reduce(reducer, {});
    }

    // construct headers objects
    if (this.source.headers && this.source.headers.length) {
      debug('headers found, constructing header pair map');

      this.source.headersObj = this.source.headers.reduce(reducer, {});
    }

    // deconstruct the uri
    this.source.uriObj = url.parse(this.source.url, true, true);

    // merge all possible queryString values
    this.source.queryObj = this.source.queryString = util._extend(this.source.uriObj.query, this.source.queryObj);

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

HTTPSnippet.prototype.convert = function (target, client, opts) {
  if (!opts && client) {
    opts = client;
  }

  var func = this._matchTarget(target, client);

  if (func) {
    return func.call(this, opts);
  }

  return false;
};

HTTPSnippet.prototype._matchTarget = function (target, client) {
  // does it exist?
  if (!targets.hasOwnProperty(target)) {
    return false;
  }

  if (typeof targets[target] === 'function') {
    return targets[target];
  }

  // shorthand
  if (typeof client === 'string' && typeof targets[target][client] === 'function') {
    return targets[target][client];
  }

  // default target
  return targets[target][targets[target].info.default];
};

// exports
module.exports = HTTPSnippet;

module.exports.availableTargets = function () {
  return Object.keys(targets).map(function (key) {
    var target = util._extend({}, targets[key].info);
    var clients = Object.keys(targets[key])

    .filter(function (prop) {
      return !~['info', 'index'].indexOf(prop);
    })

    .map(function (client) {
      return targets[key][client].info;
    });

    if (clients.length) {
      target.clients = clients;
    }

    return target;
  });
};

module.exports.extname = function (target) {
  return targets[target] ? targets[target].info.extname : '';
};
