module.exports = function (HTTPSnippet, fixtures) {
  test('should respond with stringify when useObjectBody is enabled', function () {
    const result = new HTTPSnippet(fixtures.requests['application-json']).convert('node', 'fetch', {
      useObjectBody: true,
    });

    expect(result).toBe(`const fetch = require('node-fetch');

const url = 'https://httpbin.org/anything';
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
  .catch(err => console.error('error:' + err));`);
  });

  test('should respond without stringify when useObjectBody is disabled', function () {
    const result = new HTTPSnippet(fixtures.requests['application-json']).convert('node', 'fetch', {
      useObjectBody: false,
    });

    expect(result).toBe(`const fetch = require('node-fetch');

const url = 'https://httpbin.org/anything';
const options = {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: '{"number":1,"string":"f\\"oo","arr":[1,2,3],"nested":{"a":"b"},"arr_mix":[1,"a",{"arr_mix_nested":{}}],"boolean":false}'
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));`);
  });

  test('should respond without stringify when useObjectBody is enabled on URLSearchParams', function () {
    const result = new HTTPSnippet(fixtures.requests['application-form-encoded']).convert('node', 'fetch', {
      useObjectBody: true,
    });

    expect(result).toBe(`const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const encodedParams = new URLSearchParams();

encodedParams.set('foo', 'bar');
encodedParams.set('hello', 'world');

const url = 'https://httpbin.org/anything';
const options = {
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  body: encodedParams
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));`);
  });
};
