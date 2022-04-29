import applicationFormEncoded from '../../../fixtures/requests/application-form-encoded.json';
import full from '../../../fixtures/requests/full.json';
import query from '../../../fixtures/requests/query.json';
import short from '../../../fixtures/requests/short.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

runCustomFixtures({
  targetId: 'shell',
  clientId: 'httpie',
  tests: [
    {
      it: 'should ask for verbose output',
      input: short as Request,
      options: { indent: false, verbose: true },
      expected: 'verbose-output.sh',
    },
    {
      it: 'should use short flags',
      input: short as Request,
      options: {
        body: true,
        cert: 'foo',
        headers: true,
        indent: false,
        pretty: 'x',
        print: 'y',
        short: true,
        style: 'z',
        timeout: 1,
        verbose: true,
        verify: 'v',
      },
      expected: 'short-flags.sh',
    },
    {
      it: 'should use long flags',
      input: short as Request,
      options: {
        body: true,
        cert: 'foo',
        headers: true,
        indent: false,
        pretty: 'x',
        print: 'y',
        style: 'z',
        timeout: 1,
        verbose: true,
        verify: 'v',
      },
      expected: 'long-flags.sh',
    },
    {
      it: 'should use custom indentation',
      input: full as Request,
      options: { indent: '@' },
      expected: 'custom-indentation.sh',
    },
    {
      it: 'should use queryString parameters',
      input: query as unknown as Request,
      options: { indent: false, queryParams: true },
      expected: 'querystring-parameters.sh',
    },
    {
      it: 'should build parameterized output of post data',
      input: applicationFormEncoded as Request,
      options: { short: true, indent: false, queryParams: true },
      expected: 'build-parameters.sh',
    },
  ],
});
