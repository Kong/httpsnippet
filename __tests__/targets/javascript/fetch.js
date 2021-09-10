module.exports = function (HTTPSnippet, fixtures) {
  describe('`useObjectBody` is enabled', () => {
    it('should respond with stringify on `application/json` requests', function () {
      const result = new HTTPSnippet(fixtures.requests['application-json']).convert('javascript', 'fetch', {
        useObjectBody: true,
      });

      expect(result).toBe(`const options = {
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

fetch('https://httpbin.org/anything', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));`);
    });

    it('should respond without stringify on `application-form-encoded` requests', function () {
      const result = new HTTPSnippet(fixtures.requests['application-form-encoded']).convert('javascript', 'fetch', {
        useObjectBody: true,
      });

      expect(result).toBe(`const options = {
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  body: new URLSearchParams({foo: 'bar', hello: 'world'})
};

fetch('https://httpbin.org/anything', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));`);
    });
  });

  test('should respond without stringify when `useObjectBody` is disabled', function () {
    const result = new HTTPSnippet(fixtures.requests['application-json']).convert('javascript', 'fetch', {
      useObjectBody: false,
    });

    expect(result).toBe(`const options = {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: '{"number":1,"string":"f\\"oo","arr":[1,2,3],"nested":{"a":"b"},"arr_mix":[1,"a",{"arr_mix_nested":{}}],"boolean":false}'
};

fetch('https://httpbin.org/anything', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));`);
  });
};
