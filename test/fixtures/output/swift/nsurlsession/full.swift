import Foundation

let headers = [
  "cookie": "foo=bar; bar=baz",
  "accept": "application/json",
  "content-type": "application/x-www-form-urlencoded"
]

var postData = NSMutableData(data: "foo=bar".dataUsingEncoding(NSUTF8StringEncoding)!)

var request = NSMutableURLRequest(URL: NSURL(string: "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")!,
                                        cachePolicy: .UseProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.HTTPMethod = "POST"
request.allHTTPHeaderFields = headers
request.HTTPBody = postData

let session = NSURLSession.sharedSession()
let dataTask = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    println(error)
  } else {
    let httpResponse = response as? NSHTTPURLResponse
    println(httpResponse)
  }
})

dataTask.resume()
