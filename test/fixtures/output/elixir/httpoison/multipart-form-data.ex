HTTPoison.request(
  :post,
  "http://mockbin.com/har",
  {:multipart, [{"foo", "bar"}]},
  [{"Content-Type", "multipart/form-data"}]
)
