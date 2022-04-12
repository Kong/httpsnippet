import full from '../../../fixtures/requests/full.json';
import jsonNullValue from '../../../fixtures/requests/jsonObj-null-value.json';
import short from '../../../fixtures/requests/short.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

runCustomFixtures({
  targetId: 'swift',
  clientId: 'nsurlsession',
  tests: [
    {
      it: 'should support an indent option',
      request: short as Request,
      fixtureFile: 'indent-option.swift',
      options: {
        indent: '    ',
      },
    },
    {
      it: 'should support a timeout option',
      request: short as Request,
      fixtureFile: 'timeout-option.swift',
      options: {
        timeout: 5,
      },
    },
    {
      it: 'should support pretty option',
      request: full as Request,
      fixtureFile: 'pretty-option.swift',
      options: {
        pretty: false,
      },
    },
    {
      it: 'should support json object with null value',
      request: jsonNullValue as unknown as Request,
      fixtureFile: 'json-null-value.swift',
      options: {
        pretty: false,
      },
    },
  ],
});
