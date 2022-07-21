open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "https://httpbin.org/anything" in
let headers = Header.add (Header.init ()) "content-type" "application/json" in

Client.call ~headers `POST uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)