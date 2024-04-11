import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

let headers = ["Content-Type": "multipart/form-data"]

let url = URL(string: "https://httpbin.org/anything")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers

let (data, response) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))
