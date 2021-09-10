module.exports = function (HTTPSnippet, fixtures) {
  test('should ask for verbose output', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'httpie', {
      indent: false,
      verbose: true,
    });

    expect(result).toBe('http --verbose GET https://httpbin.org/anything');
  });

  test('should use short flags', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'httpie', {
      body: true,
      cert: 'foo',
      headers: true,
      indent: false,
      pretty: 'x',
      print: 'x',
      short: true,
      style: 'x',
      timeout: 1,
      verbose: true,
      verify: 'x',
    });

    expect(result).toBe(
      'http -h -b -v -p=x --verify=x --cert=foo --pretty=x --style=x --timeout=1 GET https://httpbin.org/anything'
    );
  });

  test('should use long flags', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'httpie', {
      body: true,
      cert: 'foo',
      headers: true,
      indent: false,
      pretty: 'x',
      print: 'x',
      style: 'x',
      timeout: 1,
      verbose: true,
      verify: 'x',
    });

    expect(result).toBe(
      'http --headers --body --verbose --print=x --verify=x --cert=foo --pretty=x --style=x --timeout=1 GET https://httpbin.org/anything'
    );
  });

  test('should use custom indentation', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'httpie', {
      indent: '@',
    });

    expect(result.replace(/\\\n/g, '')).toBe(
      "http --form POST 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value' @accept:application/json @content-type:application/x-www-form-urlencoded @cookie:'foo=bar; bar=baz' @foo=bar"
    );
  });

  test('should use queryString parameters', function () {
    const result = new HTTPSnippet(fixtures.requests.query).convert('shell', 'httpie', {
      indent: false,
      queryParams: true,
    });

    expect(result.replace(/\\\n/g, '')).toBe(
      'http GET https://httpbin.org/anything foo==bar foo==baz baz==abc key==value'
    );
  });

  test('should build parameterized output of query string', function () {
    const result = new HTTPSnippet(fixtures.requests.query).convert('shell', 'httpie', {
      indent: false,
      queryParams: true,
    });

    expect(result.replace(/\\\n/g, '')).toBe(
      'http GET https://httpbin.org/anything foo==bar foo==baz baz==abc key==value'
    );
  });

  test('should build parameterized output of post data', function () {
    const result = new HTTPSnippet(fixtures.requests['application-form-encoded']).convert('shell', 'httpie', {
      short: true,
      indent: false,
      queryParams: true,
    });

    expect(result.replace(/\\\n/g, '')).toBe(
      'http -f POST https://httpbin.org/anything content-type:application/x-www-form-urlencoded foo=bar hello=world'
    );
  });
};
