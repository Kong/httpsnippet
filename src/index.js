'use strict'

var debug = require('debug')('httpsnippet')
var es = require('event-stream')
var FormData = require('form-data')
var qs = require('querystring')
var reducer = require('./reducer')
var targets = require('./targets')
var url = require('url')
var util = require('util')
var validate = require('har-validator')

// constructor
var HTTPSnippet = function (req, lang) {
  this.source = util._extend({}, req)

  // add optional properties to make validation successful
  this.source.httpVersion = this.source.httpVersion || 'HTTP/1.1'
  this.source.queryString = this.source.queryString || []
  this.source.headers = this.source.headers || []
  this.source.cookies = this.source.cookies || []
  this.source.postData = this.source.postData || {}
  this.source.postData.mimeType = this.source.postData.mimeType || 'application/octet-stream'

  this.source.bodySize = 0
  this.source.headersSize = 0
  this.source.postData.size = 0

  validate.request(this.source, function (err, valid) {
    if (!valid) {
      throw err
    }

    // construct query string object
    this.source.queryObj = {}
    this.source.headersObj = {}
    this.source.allHeaders = {}
    this.source.postData.jsonObj = false
    this.source.postData.paramsObj = false

    // construct query objects
    if (this.source.queryString && this.source.queryString.length) {
      debug('queryString found, constructing queryString pair map')

      this.source.queryObj = this.source.queryString.reduce(reducer, {})
    }

    // construct headers objects
    if (this.source.headers && this.source.headers.length) {
      // loweCase header keys
      this.source.headersObj = this.source.headers.reduceRight(function (headers, header) {
        headers[header.name.toLowerCase()] = header.value
        return headers
      }, {})
    }

    // construct Cookie header
    var cookies = this.source.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value)
    })

    if (cookies.length) {
      this.source.allHeaders.cookie = cookies.join('; ')
    }

    switch (this.source.postData.mimeType) {
      case 'multipart/mixed':
      case 'multipart/related':
      case 'multipart/form-data':
      case 'multipart/alternative':
        // reset values
        this.source.postData.text = ''
        this.source.postData.mimeType = 'multipart/form-data'

        var form = new FormData()

        // easter egg
        form._boundary = '---011000010111000001101001'

        this.source.postData.params.map(function (param) {
          form.append(param.name, param.value || '', {
            filename: param.fileName || null,
            contentType: param.contentType || null
          })
        })

        form.pipe(es.map(function (data, cb) {
          this.source.postData.text += data
        }.bind(this)))

        this.source.postData.boundary = form.getBoundary()
        this.source.headersObj['content-type'] = 'multipart/form-data; boundary=' + form.getBoundary()
        break

      case 'application/x-www-form-urlencoded':
        if (!this.source.postData.params) {
          this.source.postData.text = ''
        } else {
          this.source.postData.paramsObj = this.source.postData.params.reduce(reducer, {})

          // always overwrite
          this.source.postData.text = qs.stringify(this.source.postData.paramsObj)
        }
        break

      case 'text/json':
      case 'text/x-json':
      case 'application/json':
      case 'application/x-json':
        this.source.postData.mimeType = 'application/json'

        if (this.source.postData.text) {
          try {
            this.source.postData.jsonObj = JSON.parse(this.source.postData.text)
          } catch (e) {
            debug(e)

            // force back to text/plain
            // if headers have proper content-type value, then this should also work
            this.source.postData.mimeType = 'text/plain'
          }
        }
        break
    }

    // create allHeaders object
    this.source.allHeaders = util._extend(this.source.allHeaders, this.source.headersObj)

    // deconstruct the uri
    this.source.uriObj = url.parse(this.source.url, true, true)

    // merge all possible queryString values
    this.source.queryObj = util._extend(this.source.queryObj, this.source.uriObj.query)

    // reset uriObj values for a clean url
    this.source.uriObj.query = null
    this.source.uriObj.search = null
    this.source.uriObj.path = this.source.uriObj.pathname

    // keep the base url clean of queryString
    this.source.url = url.format(this.source.uriObj)

    // update the uri object
    this.source.uriObj.query = this.source.queryObj
    this.source.uriObj.search = qs.stringify(this.source.queryObj)

    if (this.source.uriObj.search) {
      this.source.uriObj.path = this.source.uriObj.pathname + '?' + this.source.uriObj.search
    }

    // construct a full url
    this.source.fullUrl = url.format(this.source.uriObj)
  }.bind(this))
}

HTTPSnippet.prototype.convert = function (target, client, opts) {
  if (!opts && client) {
    opts = client
  }

  var func = this._matchTarget(target, client)

  if (func) {
    return func.call(this, this.source, opts)
  }

  return false
}

HTTPSnippet.prototype._matchTarget = function (target, client) {
  // does it exist?
  if (!targets.hasOwnProperty(target)) {
    return false
  }

  if (typeof targets[target] === 'function') {
    return targets[target]
  }

  // shorthand
  if (typeof client === 'string' && typeof targets[target][client] === 'function') {
    return targets[target][client]
  }

  // default target
  return targets[target][targets[target].info.default]
}

// exports
module.exports = HTTPSnippet

module.exports.availableTargets = function () {
  return Object.keys(targets).map(function (key) {
    var target = util._extend({}, targets[key].info)
    var clients = Object.keys(targets[key])

      .filter(function (prop) {
        return !~['info', 'index'].indexOf(prop)
      })

      .map(function (client) {
        return targets[key][client].info
      })

    if (clients.length) {
      target.clients = clients
    }

    return target
  })
}

module.exports.extname = function (target) {
  return targets[target] ? targets[target].info.extname : ''
}
