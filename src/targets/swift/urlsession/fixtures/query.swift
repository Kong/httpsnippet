import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

var request = URLRequest(url: URL(string: "https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value")!)
request.httpMethod = "GET"

let (data, response) = try await URLSession.shared.data(with: request)
print(String(decoding: data, as: UTF8.self))
