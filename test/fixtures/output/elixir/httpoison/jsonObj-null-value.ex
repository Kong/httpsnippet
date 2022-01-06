HTTPoison.request(
  :post,
  "http://mockbin.com/har",
  ~s("{"foo":null}"),
  [{"content-type", "application/json"}]
)
