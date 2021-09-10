module.exports = function (HTTPSnippet, fixtures) {
  test('should support an indent option', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('objc', {
      indent: '  ',
    });

    expect(result.replace(/\n/g, '')).toBe(
      '#import <Foundation/Foundation.h>NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://httpbin.org/anything"]                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy                                                   timeoutInterval:10.0];[request setHTTPMethod:@"GET"];NSURLSession *session = [NSURLSession sharedSession];NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {                                              if (error) {                                                NSLog(@"%@", error);                                              } else {                                                NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;                                                NSLog(@"%@", httpResponse);                                              }                                            }];[dataTask resume];'
    );
  });

  test('should support a timeout option', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('objc', {
      timeout: 5,
    });

    expect(result.replace(/\n/g, '')).toBe(
      '#import <Foundation/Foundation.h>NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://httpbin.org/anything"]                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy                                                   timeoutInterval:5.0];[request setHTTPMethod:@"GET"];NSURLSession *session = [NSURLSession sharedSession];NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {                                                if (error) {                                                    NSLog(@"%@", error);                                                } else {                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;                                                    NSLog(@"%@", httpResponse);                                                }                                            }];[dataTask resume];'
    );
  });

  test('should support pretty option', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('objc', {
      pretty: false,
    });

    expect(result.replace(/\n/g, '')).toBe(
      '#import <Foundation/Foundation.h>NSDictionary *headers = @{ @"cookie": @"foo=bar; bar=baz", @"accept": @"application/json", @"content-type": @"application/x-www-form-urlencoded" };NSMutableData *postData = [[NSMutableData alloc] initWithData:[@"foo=bar" dataUsingEncoding:NSUTF8StringEncoding]];NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value"]                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy                                                   timeoutInterval:10.0];[request setHTTPMethod:@"POST"];[request setAllHTTPHeaderFields:headers];[request setHTTPBody:postData];NSURLSession *session = [NSURLSession sharedSession];NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {                                                if (error) {                                                    NSLog(@"%@", error);                                                } else {                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;                                                    NSLog(@"%@", httpResponse);                                                }                                            }];[dataTask resume];'
    );
  });

  test('should support json object with null value', function () {
    const result = new HTTPSnippet(fixtures.requests['jsonObj-null-value']).convert('objc', {
      pretty: false,
    });

    expect(result.replace(/\n/g, '')).toBe(
      '#import <Foundation/Foundation.h>NSDictionary *headers = @{ @"content-type": @"application/json" };NSDictionary *parameters = @{ @"foo":  };NSData *postData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:nil];NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://httpbin.org/anything"]                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy                                                   timeoutInterval:10.0];[request setHTTPMethod:@"POST"];[request setAllHTTPHeaderFields:headers];[request setHTTPBody:postData];NSURLSession *session = [NSURLSession sharedSession];NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {                                                if (error) {                                                    NSLog(@"%@", error);                                                } else {                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;                                                    NSLog(@"%@", httpResponse);                                                }                                            }];[dataTask resume];'
    );
  });
};
