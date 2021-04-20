/* global it */

'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should respond with stringify when `useObjectBody` is enabled', function () {
    var result = new HTTPSnippet(fixtures.requests['application-json']).convert('javascript', 'fetch', {
      useObjectBody: true
    })

    result.should.be.a.String()
    result.should.eql(`const options = {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: JSON.stringify({
    number: 1,
    string: 'f"oo',
    arr: [1, 2, 3],
    nested: {a: 'b'},
    arr_mix: [1, 'a', {arr_mix_nested: {}}],
    boolean: false
  })
};

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));`)
  })

  it('should respond without stringify when `useObjectBody` is disabled', function () {
    var result = new HTTPSnippet(fixtures.requests['application-json']).convert('javascript', 'fetch', {
      useObjectBody: false
    })

    result.should.be.a.String()
    result.should.eql(`const options = {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: '{"number":1,"string":"f\\"oo","arr":[1,2,3],"nested":{"a":"b"},"arr_mix":[1,"a",{"arr_mix_nested":{}}],"boolean":false}'
};

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));`)
  })

  it('should respond without stringify when useObjectBody is enabled on URLSearchParams', function () {
    var result = new HTTPSnippet(fixtures.requests['application-form-encoded']).convert('javascript', 'fetch', {
      useObjectBody: true
    })

    result.should.be.a.String()
    result.should.eql(`const options = {
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  body: {foo: 'bar', hello: 'world'}
};

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));`)
  })
}
