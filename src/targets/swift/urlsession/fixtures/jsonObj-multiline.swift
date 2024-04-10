import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

let headers = ["content-type": "application/json"]
let parameters = ["foo": "bar"] as [String : Any]

let postData = try JSONSerialization.data(withJSONObject: parameters, options: [])

var request = URLRequest(url: URL(string: "https://httpbin.org/anything")!)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData

let (data, response) = try await URLSession.shared.data(with: request)
print(String(decoding: data, as: UTF8.self))
