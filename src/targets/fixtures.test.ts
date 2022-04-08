import path from 'path';
import { availableTargets, extname } from '../helpers/utils';
import { readdirSync, readFileSync } from 'fs';
import { HTTPSnippet, Request } from '../httpsnippet';

const expectedBasePath = ['src', 'fixtures', 'requests'];

const inputFileNames = readdirSync(path.join(...expectedBasePath), 'utf-8');

const fixtures: [string, Request][] = inputFileNames.map(inputFileName => [
  inputFileName.replace('.json', ''),
  JSON.parse(readFileSync(path.join(...expectedBasePath, inputFileName)).toString()),
]);

/** useful for debuggin, only run a particular set of targets */
const targetFilter = [
  // put your targetId:
  // 'node',
];

/** useful for debuggin, only run a particular set of targets */
const clientFilter = [
  // put your clientId here:
  // 'unirest',
];

/** useful for debuggin, only run a particular set of fixtures */
const fixtureFilter = [
  // put the name of the fixture file you want to isolate (excluding `.json`):
  // 'multipart-file',
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
          if (expected === '<MISSING>') {
            console.log(`known missing test for ${targetId}:${clientId} "${fixture}"`);
            return;
          }

          it(`${clientId} request should match fixture for "${fixture}.json"`, () => {
            const { convert } = new HTTPSnippet(request);
            const result = convert(targetId, clientId); //?
            expect(result).toEqual(expected);
          });
        });
      });
    });
  });
