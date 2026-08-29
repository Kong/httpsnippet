import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.post(uri"http://mockbin.com/har")
  .header("content-type", "text/plain")
  .body("Hello World")
  .send(backend)
