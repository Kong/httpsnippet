import https from '../../../fixtures/requests/https.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures.js';
import type { Request } from '../../../httpsnippet.js';

runCustomFixtures({
  targetId: 'ruby',
  clientId: 'native',
  tests: [
    {
      it: 'should support the insecureSkipVerify option',
      input: https as Request,
      options: {
        insecureSkipVerify: true,
      },
      expected: 'insecure-skip-verify.rb',
    },
  ],
});
