module.exports = function (HTTPSnippet, fixtures) {
  test('should use short options', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'wget', {
      short: true,
      indent: false,
    });

    expect(result).toBe(
      "wget -q --method POST --header 'cookie: foo=bar; bar=baz' --header 'accept: application/json' --header 'content-type: application/x-www-form-urlencoded' --body-data foo=bar -O - 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value'"
    );
  });

  test('should ask for -v output', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'wget', {
      short: true,
      indent: false,
      verbose: true,
    });

    expect(result).toBe('wget -v --method GET -O - http://mockbin.com/har');
  });

  test('should ask for --verbose output', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'wget', {
      short: false,
      indent: false,
      verbose: true,
    });

    expect(result).toBe('wget --verbose --method GET --output-document - http://mockbin.com/har');
  });

  test('should use custom indentation', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'wget', {
      indent: '@',
    });

    expect(result.replace(/\\\n/g, '')).toBe(
      "wget --quiet @--method POST @--header 'cookie: foo=bar; bar=baz' @--header 'accept: application/json' @--header 'content-type: application/x-www-form-urlencoded' @--body-data foo=bar @--output-document @- 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value'"
    );
  });
};
