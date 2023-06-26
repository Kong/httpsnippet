package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://httpbin.org/anything"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("content-type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}