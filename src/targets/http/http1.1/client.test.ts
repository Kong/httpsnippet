import { HTTPSnippet, Request } from '../../../httpsnippet';

const unicodeRequest = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: [
    {
      name: 'content-type',
      value: 'text/plain',
    },
  ],
  postData: {
    mimeType: 'text/plain',
    text: 'äöü',
  },
} as Request;

describe('http:http1.1', () => {
  it('should set Content-Length to the byte length of a non-ascii body', () => {
    const result = String(new HTTPSnippet(unicodeRequest).convert('http', 'http1.1'));

    expect(result).toContain('Content-Length: 6');
  });
});
