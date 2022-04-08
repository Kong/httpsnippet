import full from '../../../fixtures/requests/full.json';
import jsonNullValue from '../../../fixtures/requests/jsonObj-null-value.json';
import short from '../../../fixtures/requests/short.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

runCustomFixtures({
  targetId: 'objc',
  clientId: 'nsurlsession',
  tests: [
    {
      title: 'should support an indent option',
      fixtureFile: 'indent-option.m',
      options: { indent: '  ' },
      request: short as Request,
    },
    {
      title: 'should support a timeout option',
      fixtureFile: 'timeout-option.m',
      options: { timeout: 5 },
      request: short as Request,
    },
    {
      title: 'should support pretty option',
      fixtureFile: 'pretty-option.m',
      options: { pretty: false },
      request: full as Request,
    },
    {
      title: 'should support json object with null value',
      fixtureFile: 'json-with-null-value.m',
      options: { pretty: false },
      request: jsonNullValue as unknown as Request,
    },
  ],
});
