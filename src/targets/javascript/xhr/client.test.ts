import request from '../../../fixtures/requests/short.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures.js';
import type { Request } from '../../../httpsnippet.js';

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
