import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import full from '../../../fixtures/requests/full.json';
import nested from '../../../fixtures/requests/nested.json';
import { Request } from '../../..';

runCustomFixtures({
  targetId: 'shell',
  clientId: 'curl',
  tests: [
    {
      fixtureFile: 'short-options.sh',
      options: { short: true, indent: false },
      request: full as Request,
      title: 'should use short options',
    },
    {
      fixtureFile: 'binary-option.sh',
      options: {
        short: true,
        indent: false,
        binary: true,
      },
      request: full as Request,
      title: 'should use binary option',
    },
    {
      fixtureFile: 'globoff-option.sh',
      options: {
        short: true,
        indent: false,
        globOff: true,
      },
      request: nested as Request,
      title: 'should use short globoff option',
    },
    {
      fixtureFile: 'long-globoff-option.sh',
      options: {
        indent: false,
        globOff: true,
      },
      request: nested as Request,
      title: 'should use long globoff option',
    },
    {
      fixtureFile: 'dont-deglob.sh',
      options: {
        indent: false,
        globOff: false,
      },
      request: nested as Request,
      title: 'should not de-glob when globoff is false',
    },
    {
      fixtureFile: 'http10.sh',
      options: {
        indent: false,
      },
      request: {
        method: 'GET',
        url: 'http://mockbin.com/request',
        httpVersion: 'HTTP/1.0',
      } as Request,
      title: 'should use --http1.0 for HTTP/1.0',
    },
    {
      fixtureFile: 'custom-indentation.sh',
      options: {
        indent: '@',
      },
      request: full as Request,
      title: 'should use custom indentation',
    },
  ],
});
