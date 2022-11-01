package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "http://mockbin.com/har"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")
	req.Header.Add("x-foo", "Bar")
	req.Header.Add("quoted-value", "\"quoted\" 'string'")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}