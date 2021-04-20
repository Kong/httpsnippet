/* global it */

'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should respond with stringify when useObjectBody is enabled', function () {
    var result = new HTTPSnippet(fixtures.requests['application-json']).convert('node', 'fetch', {
      useObjectBody: true
    })

    result.should.be.a.String()
    result.should.eql(`const fetch = require('node-fetch');

const url = 'http://mockbin.com/har';
const options = {
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

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));`)
  })

  it('should respond without stringify when useObjectBody is disabled', function () {
    var result = new HTTPSnippet(fixtures.requests['application-json']).convert('node', 'fetch', {
      useObjectBody: false
    })

    result.should.be.a.String()
    // This is identical to /test/fixtures/output/node/fetch/application-json.js, but /test/fixtures/index.js explicitly excludes output, leaving me to copy and paste for the moment.
    result.should.eql(`const fetch = require('node-fetch');

const url = 'http://mockbin.com/har';
const options = {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: '{"number":1,"string":"f\\"oo","arr":[1,2,3],"nested":{"a":"b"},"arr_mix":[1,"a",{"arr_mix_nested":{}}],"boolean":false}'
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));`)
  })

  it('should respond without stringify when useObjectBody is enabled on URLSearchParams', function () {
    var result = new HTTPSnippet(fixtures.requests['application-form-encoded']).convert('node', 'fetch', {
      useObjectBody: true
    })

    result.should.be.a.String()
    // This is identical to /test/fixtures/output/node/fetch/application-form-encoded.js, but /test/fixtures/index.js explicitly excludes output, leaving me to copy and paste for the moment.
    result.should.eql(`const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const encodedParams = new URLSearchParams();

encodedParams.set('foo', 'bar');
encodedParams.set('hello', 'world');

const url = 'http://mockbin.com/har';
const options = {
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  body: encodedParams
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));`)
  })
}
