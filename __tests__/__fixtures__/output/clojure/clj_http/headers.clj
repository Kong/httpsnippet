(require '[clj-http.client :as client])

(client/get "https://httpbin.org/headers" {:headers {:accept "text/json"
                                                     :x-foo "Bar"
                                                     :x-bar "Foo"}})
