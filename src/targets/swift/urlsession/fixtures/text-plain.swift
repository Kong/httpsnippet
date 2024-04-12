import Foundation

let postData = Data("Hello World".utf8)

let url = URL(string: "https://httpbin.org/anything")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.timeoutInterval = 10
request.allHTTPHeaderFields = ["content-type": "text/plain"]
request.httpBody = postData

let (data, response) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))