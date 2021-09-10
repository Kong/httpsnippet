(require '[clj-http.client :as client])

(client/get "http://httpbin.org/anything")
