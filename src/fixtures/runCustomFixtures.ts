import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from '@jest/globals';

import { HTTPSnippet, Request } from '../httpsnippet.js';
import { ClientId, TargetId } from '../targets/targets.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* eslint-disable jest/no-export,jest/valid-title -- we want to do it just for this one case */
export interface CustomFixture {
  targetId: TargetId;
  clientId: ClientId;
  tests: {
    it: string;
    input: Request;
    options: any;

    /** a file path pointing to the expected custom fixture result */
    expected: string;
  }[];
}

export const runCustomFixtures = ({ targetId, clientId, tests }: CustomFixture) => {
  describe(`custom fixtures for ${targetId}:${clientId}`, () => {
    tests.forEach(({ it: title, expected: fixtureFile, options, input: request }) => {
      it(title, async () => {
        const result = await new HTTPSnippet(request).convert(targetId, clientId, options);
        const filePath = path.join(
          __dirname,
          '..',
          'targets',
          targetId,
          clientId,
          'fixtures',
          fixtureFile,
        );

        const buffer = await readFile(filePath);
        const fixture = String(buffer);

        expect(result).toStrictEqual(fixture);
      });
    });
  });
};
