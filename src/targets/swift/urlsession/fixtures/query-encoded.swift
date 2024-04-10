import Foundation
#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

var request = URLRequest(url: URL(string: "https://httpbin.org/anything?startTime=2019-06-13T19%3A08%3A25.455Z&endTime=2015-09-15T14%3A00%3A12-04%3A00")!)
request.httpMethod = "GET"

let (data, response) = try await URLSession.shared.data(with: request)
print(String(decoding: data, as: UTF8.self))
