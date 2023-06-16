(require '[clj-http.client :as client])

(client/get "https://httpbin.org/headers" {:headers {:x-foo "Bar"
                                                     :x-bar "Foo"
                                                     :quoted-value "\"quoted\" 'string'"}
                                           :accept :json})