import Foundation

let parameters = ["foo": "bar"]
let joinedParameters = parameters.map { "\($0.key)=\($0.value)" }.joined(separator: "&")
let postData = Data(joinedParameters.utf8)

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
request.timeoutInterval = 10
request.allHTTPHeaderFields = ["cookie": "foo=bar; bar=baz", "accept": "application/json", "content-type": "application/x-www-form-urlencoded"]
request.httpBody = postData

let (data, _) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))