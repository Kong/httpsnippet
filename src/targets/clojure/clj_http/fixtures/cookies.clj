(require '[clj-http.client :as client])

(client/post "http://mockbin.com/har" {:headers {:cookie "foo=bar; bar=baz"}})