require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should support false boilerplate option', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('go', 'native', {
      showBoilerplate: false
    })

    result.should.be.a.String()
    result.should.eql('url := "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"\n\npayload := strings.NewReader("foo=bar")\n\nreq, _ := http.NewRequest("POST", url, payload)\n\nreq.Header.Add("cookie", "foo=bar; bar=baz")\nreq.Header.Add("accept", "application/json")\nreq.Header.Add("content-type", "application/x-www-form-urlencoded")\n\nres, _ := http.DefaultClient.Do(req)\n\ndefer res.Body.Close()\nbody, _ := ioutil.ReadAll(res.Body)\n\nfmt.Println(res)\nfmt.Println(string(body))')
  })

  it('should support checkErrors option', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('go', 'native', {
      checkErrors: true
    })

    result.should.be.a.String()
    result.should.eql(`package main

import (
\t"fmt"
\t"strings"
\t"net/http"
\t"io/ioutil"
)

func main() {

\turl := "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"

\tpayload := strings.NewReader("foo=bar")

\treq, err := http.NewRequest("POST", url, payload)

\tif err != nil {
\t\tpanic(err)
\t}
\treq.Header.Add("cookie", "foo=bar; bar=baz")
\treq.Header.Add("accept", "application/json")
\treq.Header.Add("content-type", "application/x-www-form-urlencoded")

\tres, err := http.DefaultClient.Do(req)
\tif err != nil {
\t\tpanic(err)
\t}

\tdefer res.Body.Close()
\tbody, err := ioutil.ReadAll(res.Body)
\tif err != nil {
\t\tpanic(err)
\t}

\tfmt.Println(res)
\tfmt.Println(string(body))

}`)
  })

  it('should support printBody option', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('go', 'native', {
      printBody: false
    })

    result.should.be.a.String()
    result.should.eql(`package main

import (
\t"fmt"
\t"strings"
\t"net/http"
)

func main() {

\turl := "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"

\tpayload := strings.NewReader("foo=bar")

\treq, _ := http.NewRequest("POST", url, payload)

\treq.Header.Add("cookie", "foo=bar; bar=baz")
\treq.Header.Add("accept", "application/json")
\treq.Header.Add("content-type", "application/x-www-form-urlencoded")

\tres, _ := http.DefaultClient.Do(req)

\tfmt.Println(res)

}`)
  })

  it('should support timeout option', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('go', 'native', {
      timeout: 30
    })

    result.should.be.a.String()
    result.should.eql(`package main

import (
\t"fmt"
\t"time"
\t"strings"
\t"net/http"
\t"io/ioutil"
)

func main() {

\tclient := http.Client{
\t\tTimeout: time.Duration(30 * time.Second),
\t}

\turl := "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"

\tpayload := strings.NewReader("foo=bar")

\treq, _ := http.NewRequest("POST", url, payload)

\treq.Header.Add("cookie", "foo=bar; bar=baz")
\treq.Header.Add("accept", "application/json")
\treq.Header.Add("content-type", "application/x-www-form-urlencoded")

\tres, _ := client.Do(req)

\tdefer res.Body.Close()
\tbody, _ := ioutil.ReadAll(res.Body)

\tfmt.Println(res)
\tfmt.Println(string(body))

}`)
  })
}
