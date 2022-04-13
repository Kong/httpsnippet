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
      it: 'should support an indent option',
      input: short as Request,
      options: { indent: '  ' },
      expected: 'indent-option.m',
    },
    {
      it: 'should support a timeout option',
      input: short as Request,
      options: { timeout: 5 },
      expected: 'timeout-option.m',
    },
    {
      it: 'should support pretty option',
      input: full as Request,
      options: { pretty: false },
      expected: 'pretty-option.m',
    },
    {
      it: 'should support json object with null value',
      input: jsonNullValue as unknown as Request,
      options: { pretty: false },
      expected: 'json-with-null-value.m',
    },
  ],
});
