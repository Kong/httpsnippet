import type { Request } from '../../..';

import full from '../../../fixtures/requests/full';
import jsonNullValue from '../../../fixtures/requests/jsonObj-null-value';
import short from '../../../fixtures/requests/short';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';

runCustomFixtures({
  targetId: 'swift',
  clientId: 'nsurlsession',
  tests: [
    {
      it: 'should support an indent option',
      input: short.log.entries[0].request as Request,
      options: {
        indent: '    ',
      },
      expected: 'indent-option.swift',
    },
    {
      it: 'should support a timeout option',
      input: short.log.entries[0].request as Request,
      options: {
        timeout: 5,
      },
      expected: 'timeout-option.swift',
    },
    {
      it: 'should support pretty option',
      input: full.log.entries[0].request as Request,
      options: {
        pretty: false,
      },
      expected: 'pretty-option.swift',
    },
    {
      it: 'should support json object with null value',
      input: jsonNullValue.log.entries[0].request as unknown as Request,
      options: {
        pretty: false,
      },
      expected: 'json-null-value.swift',
    },
  ],
});
