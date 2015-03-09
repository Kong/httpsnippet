'use strict';

var fixtures = require('../../fixtures');
var HTTPSnippet = require('../../../src');
var should = require('should');

describe('Objective-C', function () {
  it('should convert full request to a native Objective-c snippet', function (done) {
    var result = new HTTPSnippet(fixtures.full).convert('objc', 'native');

    result.replace(/\n/g, '').should.eql('#import <Foundation/Foundation.h>NSURLSession *session = [NSURLSession sharedSession];NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://mockbin.com/request?baz=abc&foo=bar&foo=baz"]                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy                                                   timeoutInterval:10.0];[request setHTTPMethod:@"POST"];[request setValue:@"text/plain" forHTTPHeaderField:@"Accept"];[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];[request setValue:@"2" forHTTPHeaderField:@"X-Pretty-Print"];[request setValue:@"foo=bar; bar=baz" forHTTPHeaderField:@"Cookie"];NSData *postData = [[NSData alloc] initWithData:[@"{\\"foo\\": \\"bar\\"}" dataUsingEncoding:NSUTF8StringEncoding]];[request setHTTPBody:postData];NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {}];[dataTask resume];');

    done();
  });

  it('should convert query request to a native Objective-C snippet', function (done) {
    var result = new HTTPSnippet(fixtures.query).convert('objc', 'native');

    result.replace(/\n/g, '').should.eql('#import <Foundation/Foundation.h>NSURLSession *session = [NSURLSession sharedSession];NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://mockbin.com/request?key=value&baz=abc&foo=bar&foo=baz"]                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy                                                   timeoutInterval:10.0];[request setHTTPMethod:@"POST"];NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {}];[dataTask resume];');

    done();
  });

  it('should convert simple request to a native Objective-C snippet', function (done) {
    var result = new HTTPSnippet(fixtures.simple).convert('objc', 'native');

    result.replace(/\n/g, '').should.eql('#import <Foundation/Foundation.h>NSURLSession *session = [NSURLSession sharedSession];NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://mockbin.com/request?foo=bar"]                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy                                                   timeoutInterval:10.0];[request setHTTPMethod:@"POST"];[request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];[request setValue:@"bar=baz" forHTTPHeaderField:@"Cookie"];NSData *postData = [[NSData alloc] initWithData:[@"{\\"foo\\": \\"bar\\"}" dataUsingEncoding:NSUTF8StringEncoding]];[request setHTTPBody:postData];NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {}];[dataTask resume];');

    done();
  });

  it('should convert short request to a native Objective-C snippet', function (done) {
    var result = new HTTPSnippet(fixtures.short).convert('objc', 'native');

    result.replace(/\n/g, '').should.eql('#import <Foundation/Foundation.h>NSURLSession *session = [NSURLSession sharedSession];NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://mockbin.com/echo"]                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy                                                   timeoutInterval:10.0];[request setHTTPMethod:@"GET"];NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {}];[dataTask resume];');

    done();
  });

  it('should convert http1 request to a native Objective-C snippet', function (done) {
    var result = new HTTPSnippet(fixtures.http1).convert('objc', 'native');

    result.replace(/\n/g, '').should.eql('#import <Foundation/Foundation.h>NSURLSession *session = [NSURLSession sharedSession];NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://mockbin.com/request"]                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy                                                   timeoutInterval:10.0];[request setHTTPMethod:@"GET"];NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {}];[dataTask resume];');

    done();
  });
});
