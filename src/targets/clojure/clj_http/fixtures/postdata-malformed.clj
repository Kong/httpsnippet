(require '[clj-http.client :as client])

(client/post "https://httpbin.org/anything" {:headers {:content-type "application/json"}})