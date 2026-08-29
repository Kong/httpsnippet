import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.get(uri"http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")
  .send(backend)
