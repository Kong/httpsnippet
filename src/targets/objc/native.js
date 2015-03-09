'use strict';

module.exports = function (options) {
  var code = [];

  // Dependencies
  code.push('#import <Foundation/Foundation.h>');
  code.push(null);
  code.push('NSURLSession *session = [NSURLSession sharedSession];');
  code.push(null);
  // Create request object
  code.push('NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"' + this.source.fullUrl + '"]');
  code.push('                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy');
  code.push('                                                   timeoutInterval:10.0];');
  code.push('[request setHTTPMethod:@"' + this.source.method + '"];');

  // Set headers
  this.source.headers.forEach(function (header) {
    code.push('[request setValue:@"' + header.value + '" forHTTPHeaderField:@"' + header.name + '"];');
  });

  var cookies = this.source.cookies.map(function (cookie) {
    return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
  });

  if (cookies.length) {
    code.push('[request setValue:@"' + cookies.join('; ') + '" forHTTPHeaderField:@"Cookie"];');
  }

  // Set request body
  if (this.source.postData && (this.source.postData.params || this.source.postData.text)) {
    code.push(null);

    if (this.source.postData.mimeType === 'application/x-www-form-urlencoded' && this.source.postData.params) {
      var params = this.source.postData.params;
      code.push('NSMutableData *postData = [[NSMutableData alloc] initWithData:[@"' + params[0].name + '=' + params[0].value + '" dataUsingEncoding:NSUTF8StringEncoding]];');
      for (var i = 1, len = params.length; i < len; i++) {
        code.push('[postData appendData:[@"&' + params[i].name + '=' + params[i].value + '" dataUsingEncoding:NSUTF8StringEncoding]];');
      }
    } else if (this.source.postData.mimeType === 'application/json' && this.source.postData.text) {
      code.push('NSData *postData = [[NSData alloc] initWithData:[@' +  JSON.stringify(this.source.postData.text) + ' dataUsingEncoding:NSUTF8StringEncoding]];');
    } else if (this.source.postData.text) {
      code.push('NSData *postData = [[NSData alloc] initWithData:[@"' + this.source.postData.text + '" dataUsingEncoding:NSUTF8StringEncoding]];');
    }

    code.push('[request setHTTPBody:postData];');
  }

  // Set completion block
  code.push(null);
  code.push('NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request');
  code.push('                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {');
  code.push(null);
  code.push('}];');

  // Start request
  code.push(null);
  code.push('[dataTask resume];');

  return code.join('\n');
};

module.exports.info = {
  key: 'native',
  title: 'NSURLSession',
  link: 'https://developer.apple.com/library/mac/documentation/Foundation/Reference/NSURLSession_class/index.html',
  description: 'Foundation\'s NSURLSession request'
};
