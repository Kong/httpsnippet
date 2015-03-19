/**
 * @description
 * HTTP code snippet generator for Swift using NSURLSession.
 *
 * @author
 * @thibaultCha
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var swiftHelpers = require('./helpers')

module.exports = function (source, options) {
  var opts = util._extend({
    timeout: '10',
    indent: '  ',
    pretty: true
  }, options)

  var code = []

  // Markers for headers to be created as litteral objects and later be set on the NSURLRequest if exist
  var req = {
    hasHeaders: false,
    hasBody: false
  }

  var indent = opts.indent

  // We just want to make sure people understand that is the only dependency
  code.push('import Foundation')

  if (Object.keys(source.allHeaders).length) {
    req.hasHeaders = true
    code.push(null)
    code.push(swiftHelpers.literalDeclaration('headers', source.allHeaders, opts))
  }

  if (source.postData.text || source.postData.jsonObj || source.postData.params) {
    req.hasBody = true

    switch (source.postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        code.push(null)
        // By appending parameters one by one in the resulting snippet,
        // we make it easier for the user to edit it according to his or her needs after pasting.
        // The user can just add/remove lines adding/removing body parameters.
        code.push(util.format('var postData = NSMutableData(data: "%s=%s".dataUsingEncoding(NSUTF8StringEncoding)!)', source.postData.params[0].name, source.postData.params[0].value))
        for (var i = 1, len = source.postData.params.length; i < len; i++) {
          code.push(util.format('postData.appendData("&%s=%s".dataUsingEncoding(NSUTF8StringEncoding)!)', source.postData.params[i].name, source.postData.params[i].value))
        }
        break

      case 'application/json':
        if (source.postData.jsonObj) {
          code.push(swiftHelpers.literalDeclaration('parameters', source.postData.jsonObj, opts))
          code.push(null)
          code.push('let postData = NSJSONSerialization.dataWithJSONObject(parameters, options: nil, error: nil)')
        }
        break

      case 'multipart/form-data':
        /**
         * By appending multipart parameters one by one in the resulting snippet,
         * we make it easier for the user to edit it according to his or her needs after pasting.
         * The user can just edit the parameters NSDictionary or put this part of a snippet in a multipart builder method.
        */
        code.push(swiftHelpers.literalDeclaration('parameters', source.postData.params, opts))
        code.push(null)
        code.push(util.format('let boundary = "%s"', source.postData.boundary))
        code.push(null)
        code.push('var body = ""')
        code.push('var error: NSError? = nil')
        code.push('for param in parameters {')
        code.push(indent + 'let paramName = param["name"]!')
        code.push(indent + 'body += "--\\(boundary)\\r\\n"')
        code.push(indent + 'body += "Content-Disposition:form-data; name=\\"\\(paramName)\\""')
        code.push(indent + 'if let filename = param["fileName"] {')
        code.push(indent + indent + 'let contentType = param["content-type"]!')
        code.push(indent + indent + 'let fileContent = String(contentsOfFile: filename, encoding: NSUTF8StringEncoding, error: &error)')
        code.push(indent + indent + 'if (error != nil) {')
        code.push(indent + indent + indent + 'println(error)')
        code.push(indent + indent + '}')
        code.push(indent + indent + 'body += "; filename=\\"\\(filename)\\"\\r\\n"')
        code.push(indent + indent + 'body += "Content-Type: \\(contentType)\\r\\n\\r\\n"')
        code.push(indent + indent + 'body += fileContent!')
        code.push(indent + '} else if let paramValue = param["value"] {')
        code.push(indent + indent + 'body += "\\r\\n\\r\\n\\(paramValue)"')
        code.push(indent + '}')
        code.push('}')
        break

      default:
        code.push(null)
        code.push(util.format('let postData = NSData(data: "%s".dataUsingEncoding(NSUTF8StringEncoding)!)', source.postData.text))
    }
  }

  code.push(null)
  // NSURLRequestUseProtocolCachePolicy is the default policy, let's just always set it to avoid confusion.
  code.push(util.format('var request = NSMutableURLRequest(URL: NSURL(string: "%s")!,', source.fullUrl))
  code.push('                                        cachePolicy: .UseProtocolCachePolicy,')
  code.push(util.format('                                    timeoutInterval: %s)', parseInt(opts.timeout, 10).toFixed(1)))
  code.push(util.format('request.HTTPMethod = "%s"', source.method))

  if (req.hasHeaders) {
    code.push('request.allHTTPHeaderFields = headers')
  }

  if (req.hasBody) {
    code.push('request.HTTPBody = postData')
  }

  code.push(null)
  // Retrieving the shared session will be less verbose than creating a new one.
  code.push('let session = NSURLSession.sharedSession()')
  code.push('let dataTask = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in')
  code.push(opts.indent + 'if (error != nil) {')
  code.push(opts.indent + opts.indent + 'println(error)')
  code.push(opts.indent + '} else {')
  // Casting the NSURLResponse to NSHTTPURLResponse so the user can see the status code.
  code.push(opts.indent + opts.indent + 'let httpResponse = response as? NSHTTPURLResponse')
  code.push(opts.indent + opts.indent + 'println(httpResponse)')
  code.push(opts.indent + '}')
  code.push('})')
  code.push(null)
  code.push('dataTask.resume()')

  return code.join('\n')
}

module.exports.info = {
  key: 'nsurlsession',
  title: 'NSURLSession',
  link: 'https://developer.apple.com/library/mac/documentation/Foundation/Reference/NSURLSession_class/index.html',
  description: 'Foundation\'s NSURLSession request'
}
