import { readFile } from 'fs/promises';
import path from 'path';
import { HTTPSnippet, Request } from '..';
import { ClientId, TargetId } from '../targets';

export interface CustomFixture {
  targetId: TargetId;
  clientId: ClientId;
  tests: {
    title: string;
    fixtureFile: string;
    options: any;
    request: Request;
  }[];
}

export const runCustomFixtures = ({ targetId, clientId, tests }: CustomFixture) => {
  describe(`custom fixtures for ${targetId}:${clientId}`, () => {
    tests.forEach(({ title, fixtureFile, options, request }) => {
      it(title, async () => {
        const result = new HTTPSnippet(request as Request).convert(targetId, clientId, options);
        const filePath = path.join(__dirname, '..', 'targets', targetId, clientId, 'fixtures', fixtureFile);
        const buffer = await readFile(filePath);
        const fixture = String(buffer);
        expect(result).toEqual(fixture);
      });
    });
  });
};
