import Foundation

let url = URL(string: "https://httpbin.org/anything")!
var request = URLRequest(url: url)
request.httpMethod = "GET"
request.timeoutInterval = 5

let (data, _) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))