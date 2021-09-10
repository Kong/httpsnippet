const fixtures = require('./fixtures');
const HTTPSnippet = require('../src');

describe('HTTPSnippet', () => {
  it('should return false if no matching target', () => {
    const snippet = new HTTPSnippet(fixtures.requests.short);

    expect(snippet.convert(null)).toBe(false);
  });

  it('should fail validation', () => {
    expect(() => {
      return new HTTPSnippet({ yolo: 'foo' });
    }).toThrow('validation failed');
  });

  it('should parse HAR file with multiple entries', () => {
    const snippet = new HTTPSnippet(fixtures.har);

    expect(snippet.requests).toHaveLength(2);
    expect(snippet.convert('shell')).toHaveLength(2);
  });

  it('should convert multipart/mixed to multipart/form-data', () => {
    const req = new HTTPSnippet(fixtures.mimetypes['multipart/mixed']).requests[0];

    expect(req.postData.mimeType).toBe('multipart/form-data');
  });

  it('should convert multipart/related to multipart/form-data', () => {
    const req = new HTTPSnippet(fixtures.mimetypes['multipart/related']).requests[0];

    expect(req.postData.mimeType).toBe('multipart/form-data');
  });

  it('should convert multipart/alternative to multipart/form-data', () => {
    const req = new HTTPSnippet(fixtures.mimetypes['multipart/alternative']).requests[0];

    expect(req.postData.mimeType).toBe('multipart/form-data');
  });

  it('should convert text/json to application/json', () => {
    const req = new HTTPSnippet(fixtures.mimetypes['text/json']).requests[0];

    expect(req.postData.mimeType).toBe('application/json');
  });

  it('should convert text/x-json to application/json', () => {
    const req = new HTTPSnippet(fixtures.mimetypes['text/x-json']).requests[0];

    expect(req.postData.mimeType).toBe('application/json');
  });

  it('should convert application/x-json to application/json', () => {
    const req = new HTTPSnippet(fixtures.mimetypes['application/x-json']).requests[0];

    expect(req.postData.mimeType).toBe('application/json');
  });

  it('should gracefully fallback if not able to parse JSON', () => {
    const req = new HTTPSnippet(fixtures.mimetypes['invalid-json']).requests[0];

    expect(req.postData.mimeType).toBe('text/plain');
  });

  it('should set postData.text = empty string when postData.params === undefined in application/x-www-form-urlencoded', () => {
    const req = new HTTPSnippet(fixtures.mimetypes['application/x-www-form-urlencoded']).requests[0];

    expect(req.postData.text).toBe('');
  });

  it('should add "uriObj" to source object', () => {
    const req = new HTTPSnippet(fixtures.requests.query).requests[0];

    expect(req.uriObj).toStrictEqual(
      expect.objectContaining({
        auth: null,
        hash: null,
        host: 'mockbin.com',
        hostname: 'mockbin.com',
        href: 'http://mockbin.com/har?key=value',
        path: '/har?foo=bar&foo=baz&baz=abc&key=value',
        pathname: '/har',
        port: null,
        protocol: 'http:',
        query: {
          baz: 'abc',
          key: 'value',
          foo: ['bar', 'baz'],
        },
        search: 'foo=bar&foo=baz&baz=abc&key=value',
        slashes: true,
      })
    );
  });

  it('should add "queryObj" to source object', () => {
    const req = new HTTPSnippet(fixtures.requests.query).requests[0];

    expect(req.queryObj).toStrictEqual({
      baz: 'abc',
      key: 'value',
      foo: ['bar', 'baz'],
    });
  });

  it('should add "headersObj" to source object', () => {
    const req = new HTTPSnippet(fixtures.requests.headers).requests[0];

    expect(req.headersObj).toStrictEqual({
      accept: 'application/json',
      'x-foo': 'Bar',
    });
  });

  it('should add "headersObj" to source object case insensitive when HTTP/1.0', () => {
    const fixture = { ...fixtures.requests.headers };
    fixture.httpVersion = 'HTTP/1.1';
    fixture.headers = fixture.headers.concat({
      name: 'Kong-Admin-Token',
      value: 'Hunter1',
    });

    const req = new HTTPSnippet(fixture).requests[0];
    expect(req.headersObj).toStrictEqual({
      'Kong-Admin-Token': 'Hunter1',
      accept: 'application/json',
      'x-foo': 'Bar',
    });
  });

  it('should add "headersObj" to source object in lowercase when HTTP/2.x', () => {
    const fixture = {
      ...fixtures.requests.headers,
      httpVersion: 'HTTP/2',
    };

    fixture.headers = fixture.headers.concat({
      name: 'Kong-Admin-Token',
      value: 'Hunter1',
    });

    const req = new HTTPSnippet(fixture).requests[0];
    expect(req.headersObj).toStrictEqual({
      'kong-admin-token': 'Hunter1',
      accept: 'application/json',
      'x-foo': 'Bar',
    });
  });

  it('should modify orignal url to strip query string', () => {
    const req = new HTTPSnippet(fixtures.requests.query).requests[0];

    expect(req.url).toBe('http://mockbin.com/har');
  });

  it('should add "fullUrl" to source object', () => {
    const req = new HTTPSnippet(fixtures.requests.query).requests[0];

    expect(req.fullUrl).toBe('http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value');
  });

  it('should fix "path" property of "uriObj" to match queryString', () => {
    const req = new HTTPSnippet(fixtures.requests.query).requests[0];

    expect(req.uriObj.path).toBe('/har?foo=bar&foo=baz&baz=abc&key=value');
  });
});
