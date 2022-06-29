import request from '../../../fixtures/requests/short.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

runCustomFixtures({
  targetId: 'javascript',
  clientId: 'xhr',
  tests: [
    {
      it: 'should not use cors',
      input: request as Request,
      options: {
        cors: false,
      },
      expected: 'cors.js',
    },
  ],
});
