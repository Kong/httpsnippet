open Cohttp_lwt_unix
open Lwt

let uri = Uri.of_string "http://mockbin.com/har?baz=abc&foo=bar&foo=baz" in
let headers = Header.init ()
  |> fun h -> Header.add h "Accept" "application/json"
  |> fun h -> Header.add h "Content-Type" "application/x-www-form-urlencoded"
  |> fun h -> Header.add h "Cookie" "foo=bar; bar=baz"
in
let body = "foo=bar" in

Client.call ~headers ~body (Code.method_of_string "POST") uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
