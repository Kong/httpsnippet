import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

runCustomFixtures({
  targetId: 'python',
  clientId: 'requests',
  tests: [
    {
      expected: 'query-params.py',
      options: {
        showBoilerplate: false,
      },
      input: { method: 'GET', url: 'http://mockbin.com/har?param=value' } as Request,
      it: "should support query parameters provided in HAR's url",
    },
  ],
});
