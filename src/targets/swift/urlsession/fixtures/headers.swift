import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

let headers = [
  "accept": "application/json",
  "x-foo": "Bar",
  "x-bar": "Foo",
  "quoted-value": "\"quoted\" 'string'"
]

var request = URLRequest(url: URL(string: "https://httpbin.org/headers")!)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let (data, response) = try await URLSession.shared.data(with: request)
print(String(decoding: data, as: UTF8.self))
