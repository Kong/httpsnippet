module.exports = function (HTTPSnippet, fixtures) {
  test('should use short options', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      short: true,
      indent: false,
    });

    expect(result).toBe(
      "curl -X POST 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value' -H 'accept: application/json' -H 'content-type: application/x-www-form-urlencoded' -b 'foo=bar; bar=baz' -d foo=bar"
    );
  });

  test('should use binary option', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      short: true,
      indent: false,
      binary: true,
    });

    expect(result).toBe(
      "curl -X POST 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value' -H 'accept: application/json' -H 'content-type: application/x-www-form-urlencoded' -b 'foo=bar; bar=baz' --data-binary foo=bar"
    );
  });

  test('should use short globoff option', function () {
    const result = new HTTPSnippet(fixtures.requests.nested).convert('shell', 'curl', {
      short: true,
      indent: false,
      globOff: true,
    });

    expect(result).toBe("curl -X GET -g 'https://httpbin.org/anything?foo[bar]=baz,zap&fiz=buz&key=value'");
  });

  test('should use long globoff option', function () {
    const result = new HTTPSnippet(fixtures.requests.nested).convert('shell', 'curl', {
      indent: false,
      globOff: true,
    });

    expect(result).toBe(
      "curl --request GET --globoff --url 'https://httpbin.org/anything?foo[bar]=baz,zap&fiz=buz&key=value'"
    );
  });

  test('should not de-glob when globoff is false', function () {
    const result = new HTTPSnippet(fixtures.requests.nested).convert('shell', 'curl', {
      indent: false,
      globOff: false,
    });

    expect(result).toBe(
      "curl --request GET --url 'https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value'"
    );
  });

  test('should use --http1.0 for HTTP/1.0', function () {
    const har = {
      method: 'GET',
      url: 'https://httpbin.org/anything',
      httpVersion: 'HTTP/1.0',
    };

    const result = new HTTPSnippet(har).convert('shell', 'curl', {
      indent: false,
    });

    expect(result).toBe('curl --request GET --url https://httpbin.org/anything --http1.0');
  });

  describe('`harIsAlreadyEncoded` option', () => {
    it('should not double-encode already encoded data', function () {
      const har = {
        log: {
          entries: [
            {
              request: {
                cookies: [{ name: 'user', value: encodeURIComponent('abc^') }],
                headers: [],
                headersSize: 0,
                queryString: [
                  { name: 'stringPound', value: encodeURIComponent('somethign&nothing=true') },
                  { name: 'stringHash', value: encodeURIComponent('hash#data') },
                  { name: 'stringArray', value: encodeURIComponent('where[4]=10') },
                  { name: 'stringWeird', value: encodeURIComponent('properties["$email"] == "testing"') },
                  { name: 'array', value: encodeURIComponent('something&nothing=true') },
                  { name: 'array', value: encodeURIComponent('nothing&something=false') },
                  { name: 'array', value: encodeURIComponent('another item') },
                ],
                bodySize: 0,
                method: 'POST',
                url: 'https://httpbin.org/anything',
                httpVersion: 'HTTP/1.1',
              },
            },
          ],
        },
      };

      const result = new HTTPSnippet(har, { harIsAlreadyEncoded: true }).convert('shell', 'curl');

      expect(result.replace(/\\\n/g, '')).toBe(
        "curl --request POST   --url 'https://httpbin.org/anything?stringPound=somethign%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item'   --cookie user=abc%5E"
      );
    });

    it('should escape brackets in query strings when `harIsAlreadyEncoded` is `true` and `escapeBrackets` is `true`', function () {
      const har = {
        method: 'GET',
        url: 'https://httpbin.org/anything',
        httpVersion: 'HTTP/1.1',
        queryString: [
          {
            name: 'where',
            value: '[["$attributed_flow","=","FLOW_ID"]]',
          },
        ],
      };

      const result = new HTTPSnippet(har, { harIsAlreadyEncoded: true }).convert('shell', 'curl', {
        escapeBrackets: true,
      });

      expect(result.replace(/\\\n/g, '')).toBe(
        'curl --request GET   --url \'https://httpbin.org/anything?where=\\[\\["$attributed_flow","=","FLOW_ID"\\]\\]\''
      );
    });
  });

  test('should use custom indentation', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      indent: '@',
    });

    expect(result.replace(/\\\n/g, '')).toBe(
      "curl --request POST @--url 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value' @--header 'accept: application/json' @--header 'content-type: application/x-www-form-urlencoded' @--cookie 'foo=bar; bar=baz' @--data foo=bar"
    );
  });

  test('should send JSON-encoded data with single quotes within a HEREDOC', function () {
    const har = {
      method: 'POST',
      url: 'https://httpbin.org/anything',
      headers: [
        {
          name: 'content-type',
          value: 'application/json',
        },
      ],
      postData: {
        mimeType: 'application/json',
        text: '{"number":1,"string":"f\'oo"}',
      },
    };

    const result = new HTTPSnippet(har).convert('shell', 'curl');

    expect(result.replace(/\\\n/g, '').replace(/\n/g, '')).toBe(
      'curl --request POST   --url https://httpbin.org/anything   --header \'content-type: application/json\'   --data @- <<EOF{  "number": 1,  "string": "f\'oo"}EOF'
    );
  });

  test('should keep JSON payloads that are smaller than 20 characters on one line', function () {
    const har = {
      method: 'POST',
      url: 'https://httpbin.org/anything',
      headers: [
        {
          name: 'content-type',
          value: 'application/json',
        },
      ],
      postData: {
        text: '{"foo": "bar"}',
        mimeType: 'application/json',
      },
    };

    const result = new HTTPSnippet(har).convert('shell', 'curl');

    expect(result.replace(/\\\n/g, '').replace(/\n/g, '')).toBe(
      'curl --request POST   --url https://httpbin.org/anything   --header \'content-type: application/json\'   --data \'{"foo": "bar"}\''
    );
  });
};
