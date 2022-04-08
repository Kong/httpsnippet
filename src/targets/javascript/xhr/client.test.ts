import request from '../../../fixtures/requests/short.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

runCustomFixtures({
  targetId: 'javascript',
  clientId: 'xhr',
  tests: [
    {
      title: 'should not use cors',
      fixtureFile: 'cors.js',
      options: {
        cors: false,
      },
      request: request as Request,
    },
  ],
});
