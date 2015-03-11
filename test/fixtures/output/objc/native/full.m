#import <Foundation/Foundation.h>

NSURLSession *session = [NSURLSession sharedSession];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setValue:@"application/json" forHTTPHeaderField:@"accept"];
[request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"content-type"];
[request setValue:@"foo=bar; bar=baz" forHTTPHeaderField:@"cookie"];

NSMutableData *postData = [[NSMutableData alloc] initWithData:[@"foo=bar" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {

}];

[dataTask resume];
