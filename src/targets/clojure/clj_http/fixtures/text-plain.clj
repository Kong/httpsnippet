(require '[clj-http.client :as client])

(client/post "https://httpbin.org/anything" {:body "Hello World"})