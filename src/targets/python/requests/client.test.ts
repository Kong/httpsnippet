import type { Request } from '../../../index.js';

import { runCustomFixtures } from '../../../fixtures/runCustomFixtures.js';

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
