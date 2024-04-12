import Foundation

let url = URL(string: "https://httpbin.org/headers")!
var request = URLRequest(url: url)
request.httpMethod = "GET"
request.timeoutInterval = 10
request.allHTTPHeaderFields = [
  "accept": "application/json",
  "x-foo": "Bar",
  "x-bar": "Foo",
  "quoted-value": "\"quoted\" 'string'"
]

let (data, response) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))