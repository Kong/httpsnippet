import Foundation

let headers = ["content-type": "application/json"]
let parameters = [
  "number": 1,
  "string": "f\"oo",
  "arr": [1, 2, 3],
  "nested": ["a": "b"],
  "arr_mix": [1, "a", ["arr_mix_nested": []]],
  "boolean": false
]

let postData = NSJSONSerialization.dataWithJSONObject(parameters, options: nil, error: nil)

var request = NSMutableURLRequest(URL: NSURL(string: "http://mockbin.com/har")!,
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
