import Foundation

let parameters = [
  "number": 1,
  "string": "f\"oo",
  "arr": [1, 2, 3],
  "nested": ["a": "b"],
  "arr_mix": [1, "a", ["arr_mix_nested": []]],
  "boolean": false
] as [String : Any?]

let postData = try JSONSerialization.data(withJSONObject: parameters, options: [])

let url = URL(string: "https://httpbin.org/anything")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.timeoutInterval = 10
request.allHTTPHeaderFields = ["content-type": "application/json"]
request.httpBody = postData

let (data, _) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))