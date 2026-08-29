import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.post(uri"http://mockbin.com/har")
  .header("content-type", "application/x-www-form-urlencoded")
  .body("foo=bar&hello=world")
  .send(backend)
