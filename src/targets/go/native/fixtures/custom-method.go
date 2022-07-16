package main

import (
	"fmt"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://httpbin.org/anything"

	req, _ := http.NewRequest("PROPFIND", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}