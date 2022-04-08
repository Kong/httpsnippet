import path from 'path';
import { availableTargets, extname } from '../helpers/utils';
import { readdirSync, readFileSync } from 'fs';
import { HTTPSnippet, Request } from '..';

const expectedBasePath = ['src', 'fixtures', 'requests'];

const inputFileNames = readdirSync(path.join(...expectedBasePath), 'utf-8');

const requests: [string, Request][] = inputFileNames.map(inputFileName => [
  inputFileName.replace('.json', ''),
  JSON.parse(readFileSync(path.join(...expectedBasePath, inputFileName)).toString()),
]);

availableTargets().forEach(({ key: targetId, title, clients }) => {
  describe(`${title} Request Validation`, () => {
    clients.forEach(({ key: clientId }) => {
      requests.forEach(([requestName, request]) => {
        it(`${clientId} request should match fixture for ${requestName}`, () => {
          const basePath = path.join('src', 'targets', targetId, clientId, 'fixtures', `${requestName}${extname(targetId)}`);
          const expected = readFileSync(basePath);
          const { convert } = new HTTPSnippet(request);
          const result = convert(targetId, clientId);
          const plusNewline = `${String(result)}\n`;
          expect(expected.toString()).toEqual(plusNewline);
        });
      });
    });
  });
});
