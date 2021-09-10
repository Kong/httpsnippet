(require '[clj-http.client :as client])

(client/get "https://httpbin.org/anything")
