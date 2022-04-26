import request from '../../../fixtures/requests/full.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

runCustomFixtures({
  targetId: 'go',
  clientId: 'native',
  tests: [
    {
      it: 'should support false boilerplate option',
      input: request as Request,
      options: {
        showBoilerplate: false,
      },
      expected: 'boilerplate-option.go',
    },
    {
      it: 'should support checkErrors option',
      input: request as Request,
      options: {
        checkErrors: true,
      },
      expected: 'check-errors-option.go',
    },
    {
      it: 'should support printBody option',
      input: request as Request,
      options: {
        printBody: false,
      },
      expected: 'print-body-option.go',
    },
    {
      it: 'should support timeout option',
      input: request as Request,
      options: {
        timeout: 30,
      },
      expected: 'timeout-option.go',
    },
  ],
});
