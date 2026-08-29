import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.post(uri"http://mockbin.com/har")
  .cookie("foo", "bar")
  .cookie("bar", "baz")
  .send(backend)
