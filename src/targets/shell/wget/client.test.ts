import full from '../../../fixtures/requests/full.json';
import short from '../../../fixtures/requests/short.json';
import { runCustomFixtures } from '../../../fixtures/runCustomFixtures';
import { Request } from '../../../httpsnippet';

runCustomFixtures({
  targetId: 'shell',
  clientId: 'wget',
  tests: [
    {
      it: 'should use short options',
      input: full as Request,
      options: { short: true, indent: false },
      expected: 'short-options.sh',
    },
    {
      it: 'should ask for -v output',
      input: short as Request,
      options: { short: true, indent: false, verbose: true },
      expected: 'v-output.sh',
    },
    {
      it: 'should ask for --verbose output',
      input: short as Request,
      options: { short: false, indent: false, verbose: true },
      expected: 'verbose-output.sh',
    },
    {
      it: 'should use custom indentation',
      input: full as Request,
      options: { indent: '@' },
      expected: 'custom-indentation.sh',
    },
  ],
});
