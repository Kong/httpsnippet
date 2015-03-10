open Cohttp_lwt_unix
open Lwt

let uri = Uri.of_string "http://mockbin.com/har" in
let headers = Header.init ()
  |> fun h -> Header.add h "Content-Type" "application/x-www-form-urlencoded"
in
let body = "foo=bar&hello=world" in

Client.call ~headers ~body (Code.method_of_string "POST") uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
