import https from '../../../fixtures/requests/https.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

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
