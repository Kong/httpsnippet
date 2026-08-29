import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.post(uri"http://mockbin.com/har")
  .header("Content-Type", "multipart/form-data; boundary=---011000010111000001101001")
  .body("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--\r\n")
  .send(backend)
