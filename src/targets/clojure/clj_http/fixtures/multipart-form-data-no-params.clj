(require '[clj-http.client :as client])

(client/post "http://mockbin.com/har" {:headers {:Content-Type "multipart/form-data"}})