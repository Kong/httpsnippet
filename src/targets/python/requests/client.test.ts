import { Request } from '../../..';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';

runCustomFixtures({
  targetId: 'python',
  clientId: 'requests',
  tests: [
    {
      fixtureFile: 'query-params.py',
      options: {
        showBoilerplate: false,
      },
      request: { method: 'GET', url: 'http://mockbin.com/har?param=value' } as Request,
      title: "should support query parameters provided in HAR's url",
    },
  ],
});
