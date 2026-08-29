import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.post(uri"http://mockbin.com/har")
  .header("content-type", "application/json")
  .body("{\"foo\":null}")
  .send(backend)
