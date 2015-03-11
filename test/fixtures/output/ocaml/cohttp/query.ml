open Cohttp_lwt_unix
open Lwt

let uri = Uri.of_string "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value" in

Client.call (Code.method_of_string "GET") uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
