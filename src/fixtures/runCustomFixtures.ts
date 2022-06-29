import { readFile } from 'fs/promises';
import path from 'path';

import { HTTPSnippet, Request } from '../httpsnippet';
import { ClientId, TargetId } from '../targets/targets';

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
        const result = new HTTPSnippet(request).convert(targetId, clientId, options);
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
