(require '[clj-http.client :as client])

(client/post "https://httpbin.org/anything" {:headers {:Content-Type "multipart/form-data"}})
