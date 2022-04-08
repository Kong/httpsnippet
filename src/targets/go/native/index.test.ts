import { readFile } from 'fs/promises';
import path from 'path';
import { HTTPSnippet, Request } from '../../..';
import full from '../../../fixtures/requests/full.json';

const fixtures = [
  {
    title: 'should support false boilerplate option',
    fixtureFile: 'boilerplate-option.go',
    options: {
      showBoilerplate: false,
    },
  },
  {
    title: 'should support checkErrors option',
    fixtureFile: 'check-errors-option.go',
    options: {
      checkErrors: true,
    },
  },
  {
    title: 'should support printBody option',
    fixtureFile: 'print-body-option.go',
    options: {
      printBody: false,
    },
  },
  {
    title: 'should support timeout option',
    fixtureFile: 'timeout-option.go',
    options: {
      timeout: 30,
    },
  },
];

describe('go', () => {
  fixtures.forEach(({ title, fixtureFile, options }) => {
    it(title, async () => {
      const result = new HTTPSnippet(full as Request).convert('go', 'native', options);
      const filePath = path.join(__dirname, 'fixtures', fixtureFile);
      const buffer = await readFile(filePath);
      const fixture = String(buffer);
      expect(result).toEqual(fixture);
    });
  });
});
