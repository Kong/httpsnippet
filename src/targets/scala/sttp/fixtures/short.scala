import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.get(uri"http://mockbin.com/har")
  .send(backend)
