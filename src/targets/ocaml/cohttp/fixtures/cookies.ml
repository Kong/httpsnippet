open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "https://httpbin.org/cookies" in
let headers = Header.add (Header.init ()) "cookie" "foo=bar; bar=baz" in

Client.call ~headers `GET uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)