package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://httpbin.org/cookies"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("cookie", "foo=bar; bar=baz")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}