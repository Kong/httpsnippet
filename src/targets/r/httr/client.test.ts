import { runCustomFixtures } from '../../../fixtures/runCustomFixtures.js';
import type { Request } from '../../../httpsnippet.js';

runCustomFixtures({
  targetId: 'r',
  clientId: 'httr',
  tests: [
    {
      it: "should properly concatenate query strings that aren't nested",
      input: {
        method: 'GET',
        url: 'http://mockbin.com/har',
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
