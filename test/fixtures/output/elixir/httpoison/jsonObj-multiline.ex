HTTPoison.request(
  :post,
  "http://mockbin.com/har",
  ~s("{
  "foo": "bar"
}"),
  [{"content-type", "application/json"}]
)
