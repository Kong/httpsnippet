import Foundation

var request = NSMutableURLRequest(URL: NSURL(string: "http://mockbin.com/har")!,
                                        cachePolicy: .UseProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.HTTPMethod = "GET"

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
