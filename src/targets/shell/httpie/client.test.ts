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
      title: 'should ask for verbose output',
      fixtureFile: 'verbose-output.sh',
      options: { indent: false, verbose: true },
      request: short as Request,
    },
    {
      title: 'should use short flags',
      fixtureFile: 'short-flags.sh',
      options: {
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
      },
      request: short as Request,
    },
    {
      title: 'should use long flags',
      fixtureFile: 'long-flags.sh',
      options: {
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
      },
      request: short as Request,
    },
    {
      title: 'should use custom indentation',
      fixtureFile: 'custom-indentation.sh',
      options: { indent: '@' },
      request: full as Request,
    },
    {
      title: 'should use queryString parameters',
      fixtureFile: 'querystring-parameters.sh',
      options: { indent: false, queryParams: true },
      request: query as unknown as Request,
    },
    {
      title: 'should build parameterized output of post data',
      fixtureFile: 'build-parameters.sh',
      options: { short: true, indent: false, queryParams: true },
      request: applicationFormEncoded as Request,
    },
  ],
});
