import { Request } from '../../..';
import request from '../../../fixtures/requests/full.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';

runCustomFixtures({
  targetId: 'go',
  clientId: 'native',
  tests: [
    {
      title: 'should support false boilerplate option',
      fixtureFile: 'boilerplate-option.go',
      options: {
        showBoilerplate: false,
      },
      request: request as Request,
    },
    {
      title: 'should support checkErrors option',
      fixtureFile: 'check-errors-option.go',
      options: {
        checkErrors: true,
      },
      request: request as Request,
    },
    {
      title: 'should support printBody option',
      fixtureFile: 'print-body-option.go',
      options: {
        printBody: false,
      },
      request: request as Request,
    },
    {
      title: 'should support timeout option',
      fixtureFile: 'timeout-option.go',
      options: {
        timeout: 30,
      },
      request: request as Request,
    },
  ],
});
