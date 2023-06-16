import type { Request } from '../../..';

import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';

runCustomFixtures({
  targetId: 'r',
  clientId: 'httr',
  tests: [
    {
      it: "should properly concatenate query strings that aren't nested",
      input: {
        method: 'GET',
        url: 'https://httpbin.org/anything',
        httpVersion: 'HTTP/1.1',
        queryString: [
          {
            name: 'perPage',
            value: '100',
          },
          {
            name: 'page',
            value: '1',
          },
        ],
      } as Request,
      options: {},
      expected: 'query-two-params.r',
    },
  ],
});
