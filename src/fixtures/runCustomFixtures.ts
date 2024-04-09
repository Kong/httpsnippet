import type { HTTPSnippetOptions, Request } from '../index.js';
import type { ClientId, TargetId } from '../targets/index.js';

import { writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { describe, it, expect } from 'vitest';

import { HTTPSnippet } from '../index.js';

export interface CustomFixture {
  clientId: ClientId;
  targetId: TargetId;
  tests: {
    /** a file path pointing to the expected custom fixture result */
    expected: string;

    input: Request;
    it: string;
    options: any;
  }[];
}

export const runCustomFixtures = ({ targetId, clientId, tests }: CustomFixture) => {
  describe(`custom fixtures for ${targetId}:${clientId}`, () => {
    it.each(tests.map(t => [t.it, t]))('%s', async (_, { expected: fixtureFile, options, input: request }) => {
      const opts: HTTPSnippetOptions = {};
      if (options.harIsAlreadyEncoded) {
        opts.harIsAlreadyEncoded = options.harIsAlreadyEncoded;
      }

      const snippet = new HTTPSnippet(request, opts);
      const result = snippet.convert(targetId, clientId, options)[0];
      const filePath = path.join(__dirname, '..', 'targets', targetId, clientId, 'fixtures', fixtureFile);
      if (process.env.OVERWRITE_EVERYTHING) {
        writeFileSync(filePath, String(result));
      }

      const buffer = await readFile(filePath);
      const fixture = String(buffer);

      expect(result).toStrictEqual(fixture);
    });
  });
};
