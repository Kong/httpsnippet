package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://httpbin.org/anything"

	payload := strings.NewReader("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"src/fixtures/files/hello.txt\"\r\nContent-Type: text/plain\r\n\r\n\r\n-----011000010111000001101001--")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("content-type", "multipart/form-data; boundary=---011000010111000001101001")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}