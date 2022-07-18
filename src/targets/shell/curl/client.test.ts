import applicationFormEncoded from '../../../fixtures/requests/application-form-encoded.json';
import full from '../../../fixtures/requests/full.json';
import https from '../../../fixtures/requests/https.json';
import nested from '../../../fixtures/requests/nested.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

runCustomFixtures({
  targetId: 'shell',
  clientId: 'curl',
  tests: [
    {
      it: 'should use short options',
      input: full as Request,
      options: { short: true, indent: false },
      expected: 'short-options.sh',
    },
    {
      it: 'should use binary option',
      input: full as Request,
      options: {
        short: true,
        indent: false,
        binary: true,
      },
      expected: 'binary-option.sh',
    },
    {
      it: 'should use short globoff option',
      input: nested as Request,
      options: {
        short: true,
        indent: false,
        globOff: true,
      },
      expected: 'globoff-option.sh',
    },
    {
      it: 'should use long globoff option',
      input: nested as Request,
      options: {
        indent: false,
        globOff: true,
      },
      expected: 'long-globoff-option.sh',
    },
    {
      it: 'should not de-glob when globoff is false',
      input: nested as Request,
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
      input: full as Request,
      options: {
        indent: '@',
      },
      expected: 'custom-indentation.sh',
    },
    {
      it: 'should url encode the params key',
      input: {
        ...applicationFormEncoded,
        postData: {
          mimeType: 'application/x-www-form-urlencoded',
          params: [
            { name: 'user name', value: 'John Doe' },
            { name: '$filter', value: 'by id' },
          ],
        },
      } as Request,
      options: {},
      expected: 'urlencode.sh',
    },
    {
      it: 'should support insecureSkipVerify',
      input: https as Request,
      options: {
        insecureSkipVerify: true,
      },
      expected: 'insecure-skip-verify.sh',
    },
  ],
});
