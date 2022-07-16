import type { Request } from '../../..';
import full from '../../../fixtures/requests/full';
import short from '../../../fixtures/requests/short';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';

runCustomFixtures({
  targetId: 'shell',
  clientId: 'wget',
  tests: [
    {
      it: 'should use short options',
      input: full.log.entries[0].request as Request,
      options: { short: true, indent: false },
      expected: 'short-options.sh',
    },
    {
      it: 'should ask for -v output',
      input: short.log.entries[0].request as Request,
      options: { short: true, indent: false, verbose: true },
      expected: 'v-output.sh',
    },
    {
      it: 'should ask for --verbose output',
      input: short.log.entries[0].request as Request,
      options: { short: false, indent: false, verbose: true },
      expected: 'verbose-output.sh',
    },
    {
      it: 'should use custom indentation',
      input: full.log.entries[0].request as Request,
      options: { indent: '@' },
      expected: 'custom-indentation.sh',
    },
  ],
});
