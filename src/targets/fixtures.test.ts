import path from 'path';
import { availableTargets, extname } from '../helpers/utils';
import { readdirSync, readFileSync } from 'fs';
import { HTTPSnippet, Request } from '..';

const expectedBasePath = ['src', 'fixtures', 'requests'];

const inputFileNames = readdirSync(path.join(...expectedBasePath), 'utf-8');

const fixtures: [string, Request][] = inputFileNames.map(inputFileName => [
  inputFileName.replace('.json', ''),
  JSON.parse(readFileSync(path.join(...expectedBasePath, inputFileName)).toString()),
]);

/** useful for debuggin, only run a particular set of targets */
const targetFilter = [
  // 'csharp',
];

/** useful for debuggin, only run a particular set of targets */
const clientFilter = [
  // 'restsharp',
];

/** useful for debuggin, only run a particular set of fixtures */
const fixtureFilter = [
  // 'full',
];

const testFilter =
  <T extends {}>(property: keyof T, list: T[keyof T][]) =>
  (item: T) =>
    list.length > 0 ? list.includes(item[property]) : true;

availableTargets()
  .filter(testFilter('key', targetFilter))
  .forEach(({ key: targetId, title, clients }) => {
    describe(`${title} Request Validation`, () => {
      clients.filter(testFilter('key', clientFilter)).forEach(({ key: clientId }) => {
        fixtures.filter(testFilter(0, fixtureFilter)).forEach(([fixture, request]) => {
          const basePath = path.join('src', 'targets', targetId, clientId, 'fixtures', `${fixture}${extname(targetId)}`);
          const expected = readFileSync(basePath).toString();
          if (expected === '<MISSING>\n') {
            console.log(`missing test for ${targetId}:${clientId} "${fixture}"`)
            return;
          }

          it(`${clientId} request should match fixture for "${fixture}.json"`, () => {
            const { convert } = new HTTPSnippet(request);
            const result = convert(targetId, clientId); //?
            const plusNewline = `${result}\n`; //?
            expect(plusNewline).toEqual(expected);
          });
        });
      });
    });
  });
