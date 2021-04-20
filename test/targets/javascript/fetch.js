/* global it, describe */

'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  describe('`useObjectBody` is enabled', () => {
    it('should respond with stringify on `application/json` requests', function () {
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

    it('should respond without stringify on `application-form-encoded` requests', function () {
      var result = new HTTPSnippet(fixtures.requests['application-form-encoded']).convert('javascript', 'fetch', {
        useObjectBody: true
      })

      result.should.be.a.String()
      result.should.eql(`const options = {
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  body: new URLSearchParams({foo: 'bar', hello: 'world'})
};

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));`)
    })
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
}
