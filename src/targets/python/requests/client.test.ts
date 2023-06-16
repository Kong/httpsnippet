import type { Request } from '../../..';

import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';

runCustomFixtures({
  targetId: 'python',
  clientId: 'requests',
  tests: [
    {
      expected: 'query-params.py',
      options: {
        showBoilerplate: false,
      },
      input: { method: 'GET', url: 'https://httpbin.org/anything?param=value' } as Request,
      it: "should support query parameters provided in HAR's url",
    },
  ],
});
