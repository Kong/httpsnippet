#import <Foundation/Foundation.h>

NSDictionary *headers = @{ @"Content-Type": @"application/json" };
NSDictionary *parameters = @{ @"number": @1,
                              @"string": @"f\"oo",
                              @"arr": @[ @1, @2, @3 ],
                              @"nested": @{ @"a": @"b" },
                              @"arr_mix": @[ @1, @"a", @{ @"arr_mix_nested": @{  } } ] };

NSData *postData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:nil];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://mockbin.com/har"]
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
