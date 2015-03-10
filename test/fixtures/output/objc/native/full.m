#import <Foundation/Foundation.h>

NSDictionary *headers = @{ @"Accept": @"application/json",
                           @"Content-Type": @"application/x-www-form-urlencoded",
                           @"Cookie": @"foo=bar; bar=baz" };
NSMutableData *postData = [[NSMutableData alloc] initWithData:[@"foo=bar" dataUsingEncoding:NSUTF8StringEncoding]];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://mockbin.com/har?baz=abc&foo=bar&foo=baz"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setAllHTTPHeaderFields:headers];
[request setHTTPBody:postData];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {

}];

[dataTask resume];
