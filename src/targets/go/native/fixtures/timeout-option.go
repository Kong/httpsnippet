package main

import (
	"fmt"
	"time"
	"strings"
	"net/http"
	"io"
)

func main() {

	client := http.Client{
		Timeout: time.Duration(30 * time.Second),
	}

	url := "https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value"

	payload := strings.NewReader("foo=bar")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("cookie", "foo=bar; bar=baz")
	req.Header.Add("accept", "application/json")
	req.Header.Add("content-type", "application/x-www-form-urlencoded")

	res, _ := client.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}