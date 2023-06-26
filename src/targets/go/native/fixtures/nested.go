package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(string(body))

}