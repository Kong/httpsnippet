open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "http://mockbin.com/har?startTime=2019-06-13T19%3A08%3A25.455Z&endTime=2015-09-15T14%3A00%3A12-04%3A00" in

Client.call `GET uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)
