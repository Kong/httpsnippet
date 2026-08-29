import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.get(uri"https://mockbin.com/har")
  .send(backend)
