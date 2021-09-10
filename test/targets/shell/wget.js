module.exports = function (HTTPSnippet, fixtures) {
  test('should use short options', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'wget', {
      short: true,
      indent: false,
    });

    expect(result).toBe(
      "wget -q --method POST --header 'cookie: foo=bar; bar=baz' --header 'accept: application/json' --header 'content-type: application/x-www-form-urlencoded' --body-data foo=bar -O - 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value'"
    );
  });

  test('should ask for -v output', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'wget', {
      short: true,
      indent: false,
      verbose: true,
    });

    expect(result).toBe('wget -v --method GET -O - https://httpbin.org/anything');
  });

  test('should ask for --verbose output', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'wget', {
      short: false,
      indent: false,
      verbose: true,
    });

    expect(result).toBe('wget --verbose --method GET --output-document - https://httpbin.org/anything');
  });

  test('should use custom indentation', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'wget', {
      indent: '@',
    });

    expect(result.replace(/\\\n/g, '')).toBe(
      "wget --quiet @--method POST @--header 'cookie: foo=bar; bar=baz' @--header 'accept: application/json' @--header 'content-type: application/x-www-form-urlencoded' @--body-data foo=bar @--output-document @- 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value'"
    );
  });
};
