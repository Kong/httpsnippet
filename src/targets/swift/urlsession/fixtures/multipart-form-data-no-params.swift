import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

let headers = ["Content-Type": "multipart/form-data"]

var request = URLRequest(url: URL(string: "https://httpbin.org/anything")!)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers

let (data, response) = try await URLSession.shared.data(with: request)
print(String(decoding: data, as: UTF8.self))
