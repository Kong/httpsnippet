import { readdirSync, readFileSync } from 'fs';
import * as path from 'node:path';

import short from '../fixtures/requests/short.json';
import { availableTargets, extname } from '../helpers/utils.js';
import { HTTPSnippet, Request } from '../httpsnippet.js';
import {
  addTarget,
  addTargetClient,
  Client,
  ClientId,
  isClient,
  isTarget,
  Target,
  TargetId,
  targets,
} from './targets.js';

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

const actualTargets = availableTargets().filter(testFilter('key', targetFilter));

describe.each(actualTargets)('$title Request Validation', ({ key: targetId, clients }) => {
  describe.each(clients.filter(testFilter('key', clientFilter)))('$key', ({ key: clientId }) => {
    fixtures.filter(testFilter(0, fixtureFilter)).forEach(([fixture, request]) => {
      it(`request should match fixture for "${fixture}.json"`, async () => {
        const expectedPath = path.join(
          'src',
          'targets',
          targetId,
          clientId,
          'fixtures',
          `${fixture}${extname(targetId)}`,
        );
        const expected = readFileSync(expectedPath).toString();
        const snippet = new HTTPSnippet(request);
        const result = await snippet.convert(targetId, clientId);

        expect(result).toStrictEqual(expected);
      });
    });
  });
});

describe('isTarget', () => {
  it("should throw if you don't provide an object", () => {
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget(null)).toThrow(
      'you tried to add a target which is not an object, got type: "null"',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget(undefined)).toThrow(
      'you tried to add a target which is not an object, got type: "undefined"',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget([])).toThrow(
      'you tried to add a target which is not an object, got type: "array"',
    );
  });

  it('validates required fields', () => {
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({})).toThrow('targets must contain an `info` object');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: {} })).toThrow(
      'targets must have an `info` object with the property `key`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: '' } })).toThrow('target key must be a unique string');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: null } })).toThrow('target key must be a unique string');
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: undefined } })).toThrow(
      'target key must be a unique string',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'c' } })).toThrow(
      'a target already exists with this key, `c`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z' } })).toThrow(
      'targets must have an `info` object with the property `title`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: '' } })).toThrow(
      'target title must be a non-zero-length string',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: null } })).toThrow(
      'target title must be a non-zero-length string',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: undefined } })).toThrow(
      'target title must be a non-zero-length string',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: 't' } })).toThrow(
      'targets must have an `info` object with the property `extname`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isTarget({ info: { key: 'z', title: 't', extname: '' } })).toThrow(
      'No clients provided in target z.  You must provide the property `clientsById` containg your clients.',
    );
    expect(() =>
      // @ts-expect-error intentionally incorrect
      isTarget({ info: { key: 'z', title: 't', extname: '' }, clientsById: {} }),
    ).toThrow(
      'No clients provided in target z.  You must provide the property `clientsById` containg your clients.',
    );
    expect(() =>
      // @ts-expect-error intentionally incorrect
      isTarget({ info: { key: 'z', title: 't', extname: '' }, clientsById: null }),
    ).toThrow(
      'No clients provided in target z.  You must provide the property `clientsById` containg your clients.',
    );
    expect(() =>
      // @ts-expect-error intentionally incorrect
      isTarget({ info: { key: 'z', title: 't', extname: '' }, clientsById: undefined }),
    ).toThrow(
      'No clients provided in target z.  You must provide the property `clientsById` containg your clients.',
    );
    expect(() =>
      // @ts-expect-error intentionally incorrect
      isTarget({ info: { key: 'z', title: 't', extname: '' }, clientsById: { a: {} } }),
    ).toThrow('targets must have an `info` object with the property `default`');
    expect(() =>
      isTarget({
        // @ts-expect-error intentionally incorrect
        info: { key: 'z', title: 't', extname: '', default: 'b' },
        // @ts-expect-error intentionally incorrect
        clientsById: { a: {} },
      }),
    ).toThrow(
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
    expect(() => isClient({ info: '' })).toThrow(
      'targets client must have an `info` object with property `key`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: undefined } })).toThrow(
      'client.info.key must contain an identifier unique to this target',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: null } })).toThrow(
      'client.info.key must contain an identifier unique to this target',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: '' } })).toThrow(
      'client.info.key must contain an identifier unique to this target',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: 'a' } })).toThrow(
      'targets client must have an `info` object with property `title`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: 'a', title: '' } })).toThrow(
      'targets client must have an `info` object with property `description`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: 'a', description: '', title: '' } })).toThrow(
      'targets client must have an `info` object with property `link`',
    );
    // @ts-expect-error intentionally incorrect
    expect(() => isClient({ info: { key: 'a', title: '', link: '', description: '' } })).toThrow(
      'targets client must have a `convert` property containing a conversion function',
    );
    expect(() =>
      // @ts-expect-error intentionally incorrect
      isClient({ info: { key: 'a', title: '', link: '', description: '' }, convert: '' }),
    ).toThrow('targets client must have a `convert` property containing a conversion function');
    expect(
      isClient({
        info: { key: 'a', title: '', link: '', description: '' },
        convert: () => '',
      }),
    ).toBeTruthy();
  });
});

describe('addTarget', () => {
  it('should add a new custom target', async () => {
    const { fetch: fetchClient } = await import('./node/fetch/client.js');

    const deno: Target = {
      info: {
        // @ts-expect-error intentionally incorrect
        key: 'deno',
        title: 'Deno',
        extname: '.js',
        default: 'fetch',
      },
      clientsById: {
        fetch: fetchClient,
      },
    };

    addTarget(deno);

    // @ts-expect-error intentionally incorrect
    expect(targets.deno).toBeDefined();
    // @ts-expect-error intentionally incorrect
    expect(targets.deno).toStrictEqual(deno);

    // @ts-expect-error intentionally incorrect
    delete targets.deno;
  });
});

describe('addTargetClient', () => {
  it('should add a new custom target', async () => {
    const customClient: Client = {
      info: {
        key: 'custom',
        title: 'Custom HTTP library',
        link: 'https://example.com',
        description: 'A custom HTTP library',
      },
      convert: () => {
        return 'This was generated from a custom client.';
      },
    };

    addTargetClient('node', customClient);

    const snippet = new HTTPSnippet(short as Request);
    const result = snippet.convert('node', 'custom');

    await expect(result).resolves.toBe('This was generated from a custom client.');

    delete targets.node.clientsById.custom;
  });
});
