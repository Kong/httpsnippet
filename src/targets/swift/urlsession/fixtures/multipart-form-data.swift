import Foundation

let parameters = [
  [
    "name": "foo",
    "value": "bar"
  ]
]

let boundary = "---011000010111000001101001"

var body = ""
for param in parameters {
  let paramName = param["name"]!
  body += "--\(boundary)\r\n"
  body += "Content-Disposition:form-data; name=\"\(paramName)\""
  if let filename = param["fileName"] {
    let contentType = param["contentType"]!
    let fileContent = try String(contentsOfFile: filename, encoding: .utf8)
    body += "; filename=\"\(filename)\"\r\n"
    body += "Content-Type: \(contentType)\r\n\r\n"
    body += fileContent
  } else if let paramValue = param["value"] {
    body += "\r\n\r\n\(paramValue)"
  }
}

let postData = Data(body.utf8)

let url = URL(string: "https://httpbin.org/anything")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.timeoutInterval = 10
request.allHTTPHeaderFields = ["Content-Type": "multipart/form-data; boundary=---011000010111000001101001"]
request.httpBody = postData

let (data, _) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))