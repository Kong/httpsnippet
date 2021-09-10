open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "https://httpbin.org/headers" in
let headers = Header.add_list (Header.init ()) [
  ("accept", "text/json");
  ("x-foo", "Bar");
] in

Client.call ~headers `GET uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
