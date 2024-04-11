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

let url = URL(string: "https://httpbin.org/headers")!
var request = URLRequest(url: url)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let (data, response) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))
