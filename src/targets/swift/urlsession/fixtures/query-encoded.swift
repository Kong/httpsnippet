import Foundation

let url = URL(string: "https://httpbin.org/anything")!
var components = URLComponents(url: url, resolvingAgainstBaseURL: true)!
let queryItems: [URLQueryItem] = [
  URLQueryItem(name: "startTime", value: "2019-06-13T19%3A08%3A25.455Z"),
  URLQueryItem(name: "endTime", value: "2015-09-15T14%3A00%3A12-04%3A00"),
]
components.queryItems = components.queryItems.map { $0 + queryItems } ?? queryItems

var request = URLRequest(url: components.url!)
request.httpMethod = "GET"
request.timeoutInterval = 10

let (data, response) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))