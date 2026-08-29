import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.get(uri"http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")
  .send(backend)
