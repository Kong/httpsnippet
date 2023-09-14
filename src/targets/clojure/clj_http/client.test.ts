import type { Request } from '../../../index.js';

import { runCustomFixtures } from '../../../fixtures/runCustomFixtures.js';

runCustomFixtures({
  targetId: 'clojure',
  clientId: 'clj_http',
  tests: [
    {
      it: 'should not crash if there is no `postData.text`',
      input: {
        headers: [
          {
            name: 'accept',
            value: 'application/json',
          },
          {
            name: 'content-type',
            value: 'application/json',
          },
        ],
        postData: {
          mimeType: 'application/json',
        },
        bodySize: 0,
        method: 'POST',
        url: 'https://httpbin.org/anything',
        httpVersion: 'HTTP/1.1',
      } as Request,
      options: {},
      expected: 'should-not-crash.clj',
    },
  ],
});
