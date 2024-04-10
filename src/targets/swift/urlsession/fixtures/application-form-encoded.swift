import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

let headers = ["content-type": "application/x-www-form-urlencoded"]

var postData = Data("foo=bar".utf8)
postData.append(Data("&hello=world".utf8))

var request = URLRequest(url: URL(string: "https://httpbin.org/anything")!)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData

let (data, response) = try await URLSession.shared.data(with: request)
print(String(decoding: data, as: UTF8.self))
