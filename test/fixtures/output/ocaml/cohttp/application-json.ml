open Cohttp_lwt_unix
open Lwt

let uri = Uri.of_string "http://mockbin.com/har" in
let headers = Header.init ()
  |> fun h -> Header.add h "content-type" "application/json"
in
let body = "{\"number\": 1, \"string\": \"f\\\"oo\", \"arr\": [1, 2, 3], \"nested\": {\"a\": \"b\"}, \"arr_mix\": [1, \"a\", {\"arr_mix_nested\": {}}] }" in

Client.call ~headers ~body (Code.method_of_string "POST") uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
