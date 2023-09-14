import type { Request } from '../../../index.js';

import request from '../../../fixtures/requests/short.cjs';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures.js';

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
