#import <Foundation/Foundation.h>

NSURLSession *session = [NSURLSession sharedSession];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://mockbin.com/har"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setValue:@"application/json" forHTTPHeaderField:@"content-type"];

NSData *postData = [[NSData alloc] initWithData:[@"{\"number\": 1, \"string\": \"f\\\"oo\", \"arr\": [1, 2, 3], \"nested\": {\"a\": \"b\"}, \"arr_mix\": [1, \"a\", {\"arr_mix_nested\": {}}] }" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {

}];

[dataTask resume];
