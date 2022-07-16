(require '[clj-http.client :as client])

(client/get "https://httpbin.org/cookies" {:headers {:cookie "foo=bar; bar=baz"}})