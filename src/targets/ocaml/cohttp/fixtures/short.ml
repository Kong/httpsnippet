open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "https://httpbin.org/anything" in

Client.call `GET uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)