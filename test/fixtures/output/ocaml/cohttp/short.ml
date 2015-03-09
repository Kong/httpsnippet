open Cohttp_lwt_unix
open Lwt

let uri = Uri.of_string "http://mockbin.com/har" in

Client.call (Code.method_of_string "GET") uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
