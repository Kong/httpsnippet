import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

var request = URLRequest(url: URL(string: "https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")!)
request.httpMethod = "GET"

let (data, response) = try await URLSession.shared.data(with: request)
print(String(decoding: data, as: UTF8.self))
