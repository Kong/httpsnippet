import sttp.client4.*

val backend = DefaultSyncBackend()
val response = basicRequest.post(uri"http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")
  .header("accept", "application/json")
  .header("content-type", "application/x-www-form-urlencoded")
  .cookie("foo", "bar")
  .cookie("bar", "baz")
  .body("foo=bar")
  .send(backend)
