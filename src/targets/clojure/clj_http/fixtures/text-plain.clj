(require '[clj-http.client :as client])

(client/post "http://mockbin.com/har" {:body "Hello World"})