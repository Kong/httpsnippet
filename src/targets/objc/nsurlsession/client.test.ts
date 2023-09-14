import type { Request } from '../../../index.js';

import full from '../../../fixtures/requests/full.cjs';
import jsonNullValue from '../../../fixtures/requests/jsonObj-null-value.cjs';
import short from '../../../fixtures/requests/short.cjs';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures.js';

runCustomFixtures({
  targetId: 'objc',
  clientId: 'nsurlsession',
  tests: [
    {
      it: 'should support an indent option',
      input: short.log.entries[0].request as Request,
      options: { indent: '  ' },
      expected: 'indent-option.m',
    },
    {
      it: 'should support a timeout option',
      input: short.log.entries[0].request as Request,
      options: { timeout: 5 },
      expected: 'timeout-option.m',
    },
    {
      it: 'should support pretty option',
      input: full.log.entries[0].request as Request,
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
