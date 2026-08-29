import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.get(uri"http://mockbin.com/har")
  .header("accept", "application/json")
  .header("x-foo", "Bar")
  .header("quoted-value", "\"quoted\" 'string'")
  .send(backend)
