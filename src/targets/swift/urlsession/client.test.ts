import type { Request } from '../../../index.js';

import full from '../../../fixtures/requests/full.cjs';
import jsonNullValue from '../../../fixtures/requests/jsonObj-null-value.cjs';
import short from '../../../fixtures/requests/short.cjs';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures.js';

runCustomFixtures({
  targetId: 'swift',
  clientId: 'urlsession',
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
