const fixtures = require('../fixtures');
const fs = require('fs');
const glob = require('glob');
const HTTPSnippet = require('../src');
const path = require('path');
const should = require('should');
const targets = require('../src/targets');

const base = './test/fixtures/output/';

// read all output files
const output = glob.sync('**/*', { cwd: base, nodir: true }).reduce(function (obj, name) {
  obj[name] = fs.readFileSync(base + name);
  return obj;
}, {});

const clearInfo = function (key) {
  return !['info', 'index'].includes(key);
};

const itShouldHaveTests = function (target, client) {
  it(target + ' should have tests', function (done) {
    fs.readdir(path.join(__dirname, 'targets', target), function (err, files) {
      should.not.exist(err);
      files.length.should.be.above(0);
      files.should.containEql(client + '.js');
      done();
    });
  });
};

const itShouldHaveInfo = function (name, obj) {
  it(name + ' should have info method', () => {
    obj.should.have.property('info').and.be.an.Object();
    obj.info.key.should.equal(name).and.be.a.String();
    obj.info.title.should.be.a.String();
  });
};

// TODO: investigate issues with these fixtures
const skipMe = {
  clojure: {
    clj_http: ['jsonObj-null-value', 'jsonObj-multiline'],
  },
  '*': {
    '*': [],
  },
};

const itShouldHaveRequestTestOutputFixture = function (request, target, client) {
  const fixture = target + '/' + client + '/' + request + HTTPSnippet.extname(target);

  it('should have output test for ' + request, () => {
    if (skipMe[target] && skipMe[target][client] && skipMe[target][client].indexOf(request) > -1) {
      this.skip();
    }

    Object.keys(output)
      .indexOf(fixture)
      .should.be.greaterThan(-1, 'Missing ' + fixture + ' fixture file for target: ' + target + '. Snippet tests will be skipped.');
  });
};

const itShouldGenerateOutput = function (request, path, target, client) {
  const fixture = path + request + HTTPSnippet.extname(target);

  it('should generate ' + request + ' snippet', () => {
    if (
      Object.keys(output).indexOf(fixture) === -1 ||
      (skipMe[target] && skipMe[target][client] && skipMe[target][client].indexOf(request) > -1) ||
      skipMe['*']['*'].indexOf(request) > -1
    ) {
      this.skip();
    }

    const instance = new HTTPSnippet(fixtures.requests[request]);

    // `form-data` sets the line break as `\r\n`, but we can't easily replicate that in our fixtures so let's convert
    // it to a standard line break instead.
    const result = instance.convert(target, client).replace(/\r\n/g, '\n').trim();

    result.should.be.a.String();
    result.should.equal(output[fixture].toString().trim());
  });
};

describe('Available Targets', () => {
  HTTPSnippet.availableTargets().forEach(target => {
    it('available-targets.json should include ' + target.title, () => {
      fixtures['available-targets'].should.containEql(target);
    });
  });
});

describe('Custom targets', () => {
  describe('Adding a custom target', () => {
    it('should throw if the target does has no info object', () => {
      (function () {
        HTTPSnippet.addTarget({});
      }.should.throw(Error));
    });

    it('should throw if the target does not have a properly constructed info object', () => {
      (function () {
        HTTPSnippet.addTarget({ info: { key: '' } });
      }.should.throw(Error));
    });

    it('should throw if the target already exists', () => {
      (function () {
        HTTPSnippet.addTarget(targets.node);
      }.should.throw(Error));
    });

    it('should throw if the target has no client', () => {
      (function () {
        HTTPSnippet.addTarget({
          info: targets.node.info,
        });
      }.should.throw(Error));
    });

    it('should add and convert for a new custom target', () => {
      const customTarget = require('../fixtures/customTarget');

      HTTPSnippet.addTarget(customTarget);
      const target = HTTPSnippet.availableTargets().find(function (target) {
        return target.key === customTarget.info.key;
      });
      const client = target.clients.find(function (client) {
        return client.key === customTarget.info.default;
      });
      client.should.be.an.Object();

      Object.keys(fixtures.requests)
        .filter(clearInfo)
        .forEach(function (request) {
          // Re-using the `request` module fixtures and framework since we copied it to create a custom client.
          itShouldGenerateOutput(request, 'node/request/', customTarget.info.key, customTarget.info.default);
        });
    });
  });

  describe('Adding a custom client target', () => {
    let customClient;

    beforeEach(function () {
      // Re-using the existing request client instead of mocking out something completely new.
      customClient = {
        ...targets.node.request,
        info: {
          key: 'axios-test',
          title: 'Axios',
          link: 'https://www.npmjs.com/package/axios',
          description: 'Promise based HTTP client for the browser and node.js',
        },
      };
    });

    it('should throw if client already exists', () => {
      (function () {
        HTTPSnippet.addTargetClient('node', { ...customClient, info: { ...customClient.info, key: 'axios' } });
      }.should.throw(Error));
    });

    it("should throw if the client's target does not exist", () => {
      (function () {
        HTTPSnippet.addTargetClient('node.js', customClient);
      }.should.throw(Error));
    });

    it('should throw if the client does has no info object', () => {
      (function () {
        HTTPSnippet.addTargetClient('node', {});
      }.should.throw(Error));
    });

    it('should throw if the target does not have a properly constructed info object', () => {
      (function () {
        HTTPSnippet.addTargetClient('node', { info: { key: '' } });
      }.should.throw(Error));
    });

    it('should add and convert for a new custom client target', () => {
      HTTPSnippet.addTargetClient('node', customClient);

      const target = HTTPSnippet.availableTargets().find(function (target) {
        return target.key === 'node';
      });
      const client = target.clients.find(function (client) {
        return client.key === customClient.info.key;
      });
      client.should.be.an.Object();

      Object.keys(fixtures.requests)
        .filter(clearInfo)
        .forEach(function (request) {
          // Re-using the `request` module fixtures and framework since we copied it to create a custom client target.
          itShouldGenerateOutput(request, 'node/request/', 'node', customClient.info.key);
        });
    });
  });
});

// test all the things!
describe('Targets', () => {
  Object.keys(targets).forEach(target => {
    describe(targets[target].info.title, () => {
      itShouldHaveInfo(target, targets[target]);

      Object.keys(targets[target])
        .filter(clearInfo)
        .forEach(function (client) {
          describe(client, () => {
            itShouldHaveInfo(client, targets[target][client]);

            itShouldHaveTests(target, client);

            const test = require(path.join(__dirname, 'targets', target, client));

            test(HTTPSnippet, fixtures);

            describe('snippets', () => {
              Object.keys(fixtures.requests)
                .filter(clearInfo)
                .forEach(function (request) {
                  itShouldHaveRequestTestOutputFixture(request, target, client);

                  itShouldGenerateOutput(request, target + '/' + client + '/', target, client);
                });
            });
          });
        });
    });
  });
});
