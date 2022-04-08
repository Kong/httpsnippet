import { readdirSync, readFileSync } from 'fs';
import path from 'path';

import { availableTargets, extname } from '../helpers/utils';
import { HTTPSnippet, Request } from '../httpsnippet';
import { ClientId, isClient, isTarget, TargetId } from './targets';

const expectedBasePath = ['src', 'fixtures', 'requests'];

const inputFileNames = readdirSync(path.join(...expectedBasePath), 'utf-8');

const fixtures: [string, Request][] = inputFileNames.map(inputFileName => [
  inputFileName.replace('.json', ''),
  JSON.parse(readFileSync(path.join(...expectedBasePath, inputFileName)).toString()),
]);

/** useful for debuggin, only run a particular set of targets */
const targetFilter: TargetId[] = [
  // put your targetId:
  // 'node',
];

/** useful for debuggin, only run a particular set of targets */
const clientFilter: ClientId[] = [
  // put your clientId here:
  // 'unirest',
];

/** useful for debuggin, only run a particular set of fixtures */
const fixtureFilter: string[] = [
  // put the name of the fixture file you want to isolate (excluding `.json`):
  // 'multipart-file',
];

const testFilter =
  <T>(property: keyof T, list: T[keyof T][]) =>
  (item: T) =>
    list.length > 0 ? list.includes(item[property]) : true;

availableTargets()
  .filter(testFilter('key', targetFilter))
  .forEach(({ key: targetId, title, extname: fixtureExtension, clients }) => {
    describe(`${title} Request Validation`, () => {
      clients.filter(testFilter('key', clientFilter)).forEach(({ key: clientId }) => {
        fixtures.filter(testFilter(0, fixtureFilter)).forEach(([fixture, request]) => {
          const basePath = path.join('src', 'targets', targetId, clientId, 'fixtures', `${fixture}${extname(targetId)}`);
          try {
            const expected = readFileSync(basePath).toString();
            if (expected === '<MISSING>') {
              console.log(`known missing test for ${targetId}:${clientId} "${fixture}"`);
              return;
            }

            it(`${clientId} request should match fixture for "${fixture}.json"`, () => {
              const { convert } = new HTTPSnippet(request);
              const result = convert(targetId, clientId); //?

              expect(result).toStrictEqual(expected);
            });
          } catch (error) {
            throw new Error(
              `Missing a test file for ${targetId}:${clientId} for the ${fixture} fixture.\nExpected to find the output fixture: \`/src/targets/${targetId}/${clientId}/fixtures/${fixture}${fixtureExtension}\``,
            );
          }
        });
      });
    });
  });

describe('isTarget', () => {
  it("should throw if you don't provide an object", () => {
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget(null)).toThrow('you tried to add a target which is not an object, got type: "null"');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget(undefined)).toThrow('you tried to add a target which is not an object, got type: "undefined"');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget([])).toThrow('you tried to add a target which is not an object, got type: "array"');
  });

  it('validates required fields', () => {
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({})).toThrow('targets must contain an `info` object');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: {} })).toThrow('targets must have an `info` object with the property `key`');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: '' } })).toThrow('target key must be a unique string');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: null } })).toThrow('target key must be a unique string');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: undefined } })).toThrow('target key must be a unique string');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'c' } })).toThrow('a target already exists with this key, `c`');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z' } })).toThrow('targets must have an `info` object with the property `title`');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: '' } })).toThrow('target title must be a non-zero-length string');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: null } })).toThrow('target title must be a non-zero-length string');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: undefined } })).toThrow('target title must be a non-zero-length string');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: 't' } })).toThrow('targets must have an `info` object with the property `extname`');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: 't', extname: '' } })).toThrow(
      'No clients provided in target z.  You must provide the property `clientsById` containg your clients.',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: 't', extname: '' }, clientsById: {} })).toThrow(
      'No clients provided in target z.  You must provide the property `clientsById` containg your clients.',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: 't', extname: '' }, clientsById: null })).toThrow(
      'No clients provided in target z.  You must provide the property `clientsById` containg your clients.',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: 't', extname: '' }, clientsById: undefined })).toThrow(
      'No clients provided in target z.  You must provide the property `clientsById` containg your clients.',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: 't', extname: '' }, clientsById: { a: {} } })).toThrow(
      'targets must have an `info` object with the property `default`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: 't', extname: '', default: 'b' }, clientsById: { a: {} } })).toThrow(
      'target z is configured with a default client b, but no such client was found in the property `clientsById` (found ["a"])',
    );

    expect(
      isTarget({
        info: { key: 'z' as TargetId, title: 't', extname: null, default: 'a' },
        clientsById: {
          a: {
            info: {
              key: 'a',
              title: 'a',
              description: '',
              link: '',
            },
            convert: () => '',
          },
        },
      }),
    ).toBeTruthy();
  });
});

describe('isClient', () => {
  it('validates the client', () => {
    // @ts-expect-error intentionally incorrect
    expect(() => isClient(null)).toThrow('clients must be objects');
    // @ts-expect-error intentionally incorrect
    expect(() => isClient(undefined)).toThrow('clients must be objects');
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({})).toThrow('targets client must contain an `info` object');
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: '' })).toThrow('targets client must have an `info` object with property `key`');
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: undefined } })).toThrow('client.info.key must contain an identifier unique to this target');
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: null } })).toThrow('client.info.key must contain an identifier unique to this target');
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: '' } })).toThrow('client.info.key must contain an identifier unique to this target');
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: 'a' } })).toThrow('targets client must have an `info` object with property `title`');
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: 'a', title: '' } })).toThrow('targets client must have an `info` object with property `description`');
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: 'a', description: '', title: '' } })).toThrow(
      'targets client must have an `info` object with property `link`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: 'a', title: '', link: '', description: '' } })).toThrow(
      'targets client must have a `convert` property containing a conversion function',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: 'a', title: '', link: '', description: '' }, convert: '' })).toThrow(
      'targets client must have a `convert` property containing a conversion function',
    );
    expect(
      isClient({
        info: { key: 'a', title: '', link: '', description: '' },
        convert: () => '',
      }),
    ).toBeTruthy();
  });
});
