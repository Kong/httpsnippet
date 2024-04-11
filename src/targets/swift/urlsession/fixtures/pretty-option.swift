import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

let headers = ["cookie": "foo=bar; bar=baz", "accept": "application/json", "content-type": "application/x-www-form-urlencoded"]

let postData = Data("foo=bar".utf8)

let url = URL(string: "https://httpbin.org/anything?key=value")!
var components = URLComponents(url: url, resolvingAgainstBaseURL: true)!
let queryItems: [URLQueryItem] = [
  URLQueryItem(name: "foo", value: "bar"),
  URLQueryItem(name: "foo", value: "baz"),
  URLQueryItem(name: "baz", value: "abc"),
  URLQueryItem(name: "key", value: "value"),
]
components.queryItems = components.queryItems.map { $0 + queryItems } ?? queryItems

var request = URLRequest(url: components.url!)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData

let (data, response) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))
