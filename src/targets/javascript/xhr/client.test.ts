import type { Request } from '../../..';
import request from '../../../fixtures/requests/short';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';

runCustomFixtures({
  targetId: 'javascript',
  clientId: 'xhr',
  tests: [
    {
      it: 'should not use cors',
      input: request.log.entries[0].request as Request,
      options: {
        cors: false,
      },
      expected: 'cors.js',
    },
  ],
});
