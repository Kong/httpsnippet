import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

let headers = [
  "cookie": "foo=bar; bar=baz",
  "accept": "application/json",
  "content-type": "application/x-www-form-urlencoded"
]

let postData = Data("foo=bar".utf8)

var request = URLRequest(url: URL(string: "https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value")!)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData

let (data, response) = try await URLSession.shared.data(with: request)
print(String(decoding: data, as: UTF8.self))
