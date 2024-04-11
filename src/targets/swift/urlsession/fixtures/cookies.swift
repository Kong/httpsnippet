import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

let headers = ["cookie": "foo=bar; bar=baz"]

let url = URL(string: "https://httpbin.org/cookies")!
var request = URLRequest(url: url)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let (data, response) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))
