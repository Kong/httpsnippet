import Foundation

let headers = [
  "accept": "application/json",
  "x-foo": "Bar",
  "x-bar": "Foo"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://httpbin.org/headers")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()