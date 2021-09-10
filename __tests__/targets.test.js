const fixtures = require('./__fixtures__');
const fs = require('fs');
const glob = require('glob');
const HTTPSnippet = require('../src');
const path = require('path');
const targets = require('../src/targets');

const base = './__tests__/__fixtures__/output/';

// read all output files
const output = glob.sync('**/*', { cwd: base, nodir: true }).reduce(function (obj, name) {
  // eslint-disable-next-line no-param-reassign
  obj[name] = fs.readFileSync(base + name);
  return obj;
}, {});

const clearInfo = function (key) {
  return !['info', 'index'].includes(key);
};

function itShouldHaveTests(target, client) {
  test(`${target} should have tests`, () => {
    const files = fs.readdirSync(path.join(__dirname, 'targets', target));

    expect(files).not.toHaveLength(0);
    expect(files).toContainEqual(`${client}.js`);
  });
}

function itShouldHaveInfo(name, obj) {
  test(`${name} should have info method`, () => {
    expect(obj).toHaveProperty('info', expect.anything(Object));
    expect(obj.info.key).toBe(name);
    expect(obj.info.title).toStrictEqual(expect.anything(String));
  });
}

// TODO: investigate issues with these fixtures
const skipMe = {
  clojure: {
    clj_http: ['jsonObj-null-value', 'jsonObj-multiline'],
  },
  '*': {
    '*': [],
  },
};

function itShouldHaveRequestTestOutputFixture(request, target, client) {
  const fixture = `${target}/${client}/${request}${HTTPSnippet.extname(target)}`;

  test(`should have output test for ${request}`, () => {
    // eslint-disable-next-line jest/no-if
    if (skipMe[target] && skipMe[target][client] && skipMe[target][client].indexOf(request) > -1) {
      return;
    }

    expect(Object.keys(output)).toContain(fixture);
  });
}

const itShouldGenerateOutput = function (request, fixturePath, target, client) {
  const fixture = fixturePath + request + HTTPSnippet.extname(target);

  test(`should generate ${request} snippet`, () => {
    // eslint-disable-next-line jest/no-if
    if (
      Object.keys(output).indexOf(fixture) === -1 ||
      (skipMe[target] && skipMe[target][client] && skipMe[target][client].indexOf(request) > -1) ||
      skipMe['*']['*'].indexOf(request) > -1
    ) {
      return;
    }

    const options = {};
    if (request === 'query-encoded') {
      // Query strings in this HAR are already escaped.
      options.harIsAlreadyEncoded = true;
    }

    const instance = new HTTPSnippet(fixtures.requests[request], options);

    // `form-data` sets the line break as `\r\n`, but we can't easily replicate that in our fixtures so let's convert
    // it to a standard line break instead.
    const result = instance.convert(target, client).replace(/\r\n/g, '\n').trim();

    expect(result).toStrictEqual(output[fixture].toString().trim());
  });
};

describe('Available Targets', () => {
  HTTPSnippet.availableTargets().forEach(target => {
    it(`available-targets.json should include ${target.title}`, () => {
      expect(fixtures['available-targets']).toContainEqual(target);
    });
  });
});

describe('Custom targets', () => {
  describe('#addTarget()', () => {
    it('should throw if the target does has no info object', () => {
      expect(() => {
        HTTPSnippet.addTarget({});
      }).toThrow('The supplied custom target must contain an `info` object.');
    });

    it('should throw if the target does not have a properly constructed info object', () => {
      expect(() => {
        HTTPSnippet.addTarget({ info: { key: '' } });
      }).toThrow(
        'The supplied custom target must have an `info` object with a `key`, `title`, `extname`, and `default` property.'
      );
    });

    it('should throw if the target already exists', () => {
      expect(() => {
        HTTPSnippet.addTarget(targets.node);
      }).toThrow('The supplied custom target already exists');
    });

    it('should throw if the target has no client', () => {
      expect(() => {
        HTTPSnippet.addTarget({
          info: {
            key: 'language',
            title: 'Language Name',
            extname: '.ext',
            default: 'native',
          },
        });
      }).toThrow('A custom target must have a client defined on it.');
    });

    describe('full add + convert flow', () => {
      const customTarget = require('./__fixtures__/customTarget');

      let client;

      beforeAll(() => {
        HTTPSnippet.addTarget(customTarget);
        const target = HTTPSnippet.availableTargets().find(t => t.key === customTarget.info.key);
        client = target.clients.find(c => c.key === customTarget.info.default);
      });

      it('should add a new custom target', () => {
        expect(client).toStrictEqual({
          key: 'request',
          title: 'Request',
          link: 'https://github.com/request/request',
          description: 'Simplified HTTP request client',
        });
      });

      Object.keys(fixtures.requests)
        .filter(clearInfo)
        .forEach(request => {
          // Re-using the `request` module fixtures and framework since we copied it to create a custom client.
          itShouldGenerateOutput(request, 'node/request/', customTarget.info.key, customTarget.info.default);
        });
    });
  });

  describe('#addTargetClient()', () => {
    const customClient = {
      ...targets.node.request,
      info: {
        key: 'axios-test',
        title: 'Axios',
        link: 'https://www.npmjs.com/package/axios',
        description: 'Promise based HTTP client for the browser and node.js',
      },
    };

    it('should throw if client already exists', () => {
      expect(() => {
        HTTPSnippet.addTargetClient('node', { ...customClient, info: { ...customClient.info, key: 'axios' } });
      }).toThrow('The supplied custom target client already exists, please use a different key');
    });

    it("should throw if the client's target does not exist", () => {
      expect(() => {
        HTTPSnippet.addTargetClient('node.js', customClient);
      }).toThrow('Sorry, but no node.js target exists to add clients to.');
    });

    it('should throw if the client does has no info object', () => {
      expect(() => {
        HTTPSnippet.addTargetClient('node', {});
      }).toThrow('The supplied custom target client must contain an `info` object.');
    });

    it('should throw if the target does not have a properly constructed info object', () => {
      expect(() => {
        HTTPSnippet.addTargetClient('node', { info: { key: '' } });
      }).toThrow('The supplied custom target client must have an `info` object with a `key` and `title` property.');
    });

    describe('full add + convert flow', () => {
      let client;

      beforeAll(() => {
        HTTPSnippet.addTargetClient('node', customClient);

        const target = HTTPSnippet.availableTargets().find(t => t.key === 'node');
        client = target.clients.find(c => c.key === customClient.info.key);
      });

      it('should add a new custom target', () => {
        expect(client).toStrictEqual({
          description: 'Promise based HTTP client for the browser and node.js',
          key: 'axios-test',
          link: 'https://www.npmjs.com/package/axios',
          title: 'Axios',
        });
      });

      Object.keys(fixtures.requests)
        .filter(clearInfo)
        .forEach(function (request) {
          // Re-using the `request` module fixtures and framework since we copied it to create a custom client target.
          itShouldGenerateOutput(request, 'node/http/', 'node', customClient.info.key);
        });
    });
  });
});

// test all the things!
describe('Targets', () => {
  Object.keys(targets).forEach(target => {
    // eslint-disable-next-line jest/valid-title
    describe(targets[target].info.title, () => {
      itShouldHaveInfo(target, targets[target]);

      Object.keys(targets[target])
        .filter(clearInfo)
        .forEach(function (client) {
          // eslint-disable-next-line jest/valid-title
          describe(client, function () {
            itShouldHaveInfo(client, targets[target][client]);

            itShouldHaveTests(target, client);

            // eslint-disable-next-line import/no-dynamic-require
            const clientTest = require(path.join(__dirname, 'targets', target, client));
            clientTest(HTTPSnippet, fixtures);

            describe('snippets', function () {
              Object.keys(fixtures.requests)
                .filter(clearInfo)
                .forEach(function (request) {
                  itShouldHaveRequestTestOutputFixture(request, target, client);

                  itShouldGenerateOutput(request, `${target}/${client}/`, target, client);
                });
            });
          });
        });
    });
  });
});
