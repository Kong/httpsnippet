'use strict'

var util = require('util')

module.exports = function (source, options) {
  var opts = util._extend({
    timeout: '10'
  }, options)

  var code = []

  // Dependencies
  code.push('#import <Foundation/Foundation.h>')
  code.push(null)
  code.push('NSURLSession *session = [NSURLSession sharedSession];')
  code.push(null)
  // Create request object
  code.push('NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"' + source.fullUrl + '"]')
  code.push('                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy')
  code.push('                                                   timeoutInterval:' + parseInt(opts.timeout, 10).toFixed(1) + '];')
  code.push('[request setHTTPMethod:@"' + source.method + '"];')

  // Set headers
  Object.keys(source.allHeaders).sort().map(function (key) {
    code.push('[request setValue:@"' + source.allHeaders[key] + '" forHTTPHeaderField:@"' + key + '"];')
  })

  // Set request body
  if (source.postData && (source.postData.params || source.postData.text)) {
    code.push(null)

    if (source.postData.mimeType === 'application/x-www-form-urlencoded' && source.postData.params) {
      var params = source.postData.params
      code.push('NSMutableData *postData = [[NSMutableData alloc] initWithData:[@"' + params[0].name + '=' + params[0].value + '" dataUsingEncoding:NSUTF8StringEncoding]];')
      for (var i = 1, len = params.length; i < len; i++) {
        code.push('[postData appendData:[@"&' + params[i].name + '=' + params[i].value + '" dataUsingEncoding:NSUTF8StringEncoding]];')
      }
    } else if (source.postData.mimeType === 'application/json' && source.postData.text) {
      code.push('NSData *postData = [[NSData alloc] initWithData:[@' + JSON.stringify(source.postData.text) + ' dataUsingEncoding:NSUTF8StringEncoding]];')
    } else if (source.postData.text) {
      code.push('NSData *postData = [[NSData alloc] initWithData:[@"' + source.postData.text + '" dataUsingEncoding:NSUTF8StringEncoding]];')
    }

    code.push('[request setHTTPBody:postData];')
  }

  // Set completion block
  code.push(null)
  code.push('NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request')
  code.push('                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {')
  code.push(null)
  code.push('}];')

  // Start request
  code.push(null)
  code.push('[dataTask resume];')

  return code.join('\n')
}

module.exports.info = {
  key: 'native',
  title: 'NSURLSession',
  link: 'https://developer.apple.com/library/mac/documentation/Foundation/Reference/NSURLSession_class/index.html',
  description: "Foundation's NSURLSession request"
}
