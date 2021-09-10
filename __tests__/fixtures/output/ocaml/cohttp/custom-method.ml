open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "https://httpbin.org/anything" in

Client.call (Code.method_of_string "PROPFIND") uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
