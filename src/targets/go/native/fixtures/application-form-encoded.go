package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://httpbin.org/anything"

	payload := strings.NewReader("foo=bar&hello=world")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("content-type", "application/x-www-form-urlencoded")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}