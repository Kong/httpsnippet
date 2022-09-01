import type { Request } from '../../..';

import applicationFormEncoded from '../../../fixtures/requests/application-form-encoded';
import full from '../../../fixtures/requests/full';
import query from '../../../fixtures/requests/query';
import short from '../../../fixtures/requests/short';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';

runCustomFixtures({
  targetId: 'shell',
  clientId: 'httpie',
  tests: [
    {
      it: 'should ask for verbose output',
      input: short.log.entries[0].request as Request,
      options: { indent: false, verbose: true },
      expected: 'verbose-output.sh',
    },
    {
      it: 'should use short flags',
      input: short.log.entries[0].request as Request,
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
      input: short.log.entries[0].request as Request,
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
      input: full.log.entries[0].request as Request,
      options: { indent: '@' },
      expected: 'custom-indentation.sh',
    },
    {
      it: 'should use queryString parameters',
      input: query.log.entries[0].request as Request,
      options: { indent: false, queryParams: true },
      expected: 'querystring-parameters.sh',
    },
    {
      it: 'should build parameterized output of post data',
      input: applicationFormEncoded.log.entries[0].request as Request,
      options: { short: true, indent: false, queryParams: true },
      expected: 'build-parameters.sh',
    },
  ],
});
