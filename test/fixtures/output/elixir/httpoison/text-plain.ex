HTTPoison.request(
  :post,
  "http://mockbin.com/har",
  "Hello World",
  [{"content-type", "text/plain"}]
)
