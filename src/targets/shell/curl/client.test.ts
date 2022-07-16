import type { Request } from '../../..';
import full from '../../../fixtures/requests/full';
import nested from '../../../fixtures/requests/nested';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';

runCustomFixtures({
  targetId: 'shell',
  clientId: 'curl',
  tests: [
    {
      it: 'should use short options',
      input: full.log.entries[0].request as Request,
      options: { short: true, indent: false },
      expected: 'short-options.sh',
    },
    {
      it: 'should use binary option',
      input: full.log.entries[0].request as Request,
      options: {
        short: true,
        indent: false,
        binary: true,
      },
      expected: 'binary-option.sh',
    },
    {
      it: 'should use short globoff option',
      input: nested.log.entries[0].request as Request,
      options: {
        short: true,
        indent: false,
        globOff: true,
      },
      expected: 'globoff-option.sh',
    },
    {
      it: 'should use long globoff option',
      input: nested.log.entries[0].request as Request,
      options: {
        indent: false,
        globOff: true,
      },
      expected: 'long-globoff-option.sh',
    },
    {
      it: 'should not de-glob when globoff is false',
      input: nested.log.entries[0].request as Request,
      options: {
        indent: false,
        globOff: false,
      },
      expected: 'dont-deglob.sh',
    },
    {
      it: 'should use --http1.0 for HTTP/1.0',
      input: {
        method: 'GET',
        url: 'http://mockbin.com/request',
        httpVersion: 'HTTP/1.0',
      } as Request,
      options: {
        indent: false,
      },
      expected: 'http10.sh',
    },
    {
      it: 'should use custom indentation',
      input: full.log.entries[0].request as Request,
      options: {
        indent: '@',
      },
      expected: 'custom-indentation.sh',
    },

    {
      it: 'should send JSON-encoded data with single quotes within a HEREDOC',
      input: {
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
      } as Request,
      options: {},
      expected: 'heredoc-json-encoded-data.sh',
    },
    {
      it: 'should keep JSON payloads that are smaller than 20 characters on one line',
      input: {
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
      } as Request,
      options: {},
      expected: 'json-payloads-smaller-than-20-characters.sh',
    },

    // `harIsAlreadyEncoded` option
    {
      it: 'should not double-encode already encoded data with `harIsAlreadyEncoded`',
      input: {
        cookies: [{ name: 'user', value: encodeURIComponent('abc^') }],
        queryString: [
          { name: 'stringPound', value: encodeURIComponent('somethign&nothing=true') },
          { name: 'stringHash', value: encodeURIComponent('hash#data') },
          { name: 'stringArray', value: encodeURIComponent('where[4]=10') },
          { name: 'stringWeird', value: encodeURIComponent('properties["$email"] == "testing"') },
          { name: 'array', value: encodeURIComponent('something&nothing=true') },
          { name: 'array', value: encodeURIComponent('nothing&something=false') },
          { name: 'array', value: encodeURIComponent('another item') },
        ],
        method: 'POST',
        url: 'https://httpbin.org/anything',
        httpVersion: 'HTTP/1.1',
      } as Request,
      options: {
        harIsAlreadyEncoded: true,
      },
      expected: 'harIsAlreadyEncoded-option-already-encoded.sh',
    },
    {
      it: 'should escape brackets in query strings when `harIsAlreadyEncoded` is `true` and `escapeBrackets` is `true`',
      input: {
        method: 'GET',
        url: 'https://httpbin.org/anything',
        httpVersion: 'HTTP/1.1',
        queryString: [
          {
            name: 'where',
            value: '[["$attributed_flow","=","FLOW_ID"]]',
          },
        ],
      } as Request,
      options: {
        harIsAlreadyEncoded: true,
        // escapeBrackets: true, // @todo this need to be enabled?
      },
      expected: 'harIsAlreadyEncoded=option-escape-brackets.sh',
    },
  ],
});
