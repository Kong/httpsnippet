'use strict';

var async  = require('async');
var fixtures = require('./fixtures');
var fs = require('fs');
var glob = require('glob');
var should = require('should');
var snippet = require('../src');
var targets = require('../src/targets');
var tests = require('./tests');

var base = './test/fixtures/output/';

// read all output files
var output = glob.sync('**/*', {cwd: base, nodir: true}).reduce(function (obj, name) {
  obj[name] = fs.readFileSync(base + name);
  return obj;
}, {});

var clearInfo = function (key, cb) {
  cb(!~['info', 'index'].indexOf(key));
};

var itShouldHaveTests = function (test, func, key) {
  it(key + ' should have tests', function (done) {
    test.should.have.property(func);
    done();
  });
};

var itShouldHaveInfo = function (targets, key) {
  it(key + ' should have info method', function (done) {
    var target = targets[key];

    target.should.have.property('info').and.be.an.Object;

    target.info.key.should.be.a.String.and.equal(key);

    target.info.title.should.be.a.String;

    done();
  });
};

var itShouldHaveRequestTestOutputFixture = function (request, target, path) {
  it('should have output test for ' + request, function (done) {
    Object.keys(output).indexOf(target + '/' + path + request + snippet.extname(target)).should.be.greaterThan(-1);

    done();
  });
};

var itShouldGenerateOutput = function (request, path, target, client) {
  var fixture = path + request + snippet.extname(target);

  if (request.hasOwnProperty(fixture)) {
    it('should generate ' + request, function (done) {
      var instance = new snippet(fixtures.requests[request]);
      var result = instance.convert(target, client) + '\n';

      result.should.be.a.String;
      result.should.equal(output[fixture].toString());

      done();
    });
  }
};

describe('Available Targets', function () {
  var targets = snippet.availableTargets();

  targets.map(function (target) {
    it('available-targets.json should include ' + target.title, function (done) {
      fixtures['available-targets'].should.containEql(target);
      done();
    });
  });
});

// test all the things!
async.each(Object.keys(targets), function (target) {
  describe(targets[target].info.title, function () {
    itShouldHaveInfo(targets, target);

    itShouldHaveTests(tests, target, target);

    if (typeof tests[target] === 'function') {
      tests[target](snippet, fixtures);
    }

    if (!targets[target].index) {
      describe('requests', function () {
        async.filter(Object.keys(fixtures.requests), clearInfo, function (requests) {
          async.each(requests, function (request) {
            itShouldHaveRequestTestOutputFixture(request, target, '');

            itShouldGenerateOutput(request, target + '/', target);
          });
        });
      });
    }

    async.filter(Object.keys(targets[target]), clearInfo, function (clients) {
      async.each(clients, function (client) {
        describe(client, function () {
          itShouldHaveInfo(targets[target], client);

          itShouldHaveTests(tests[target], client, client);

          if (tests[target] && typeof tests[target][client] === 'function') {
            tests[target][client](snippet, fixtures);
          }

          describe('requests', function () {
            async.filter(Object.keys(fixtures.requests), clearInfo, function (requests) {
              async.each(requests, function (request) {
                itShouldHaveRequestTestOutputFixture(request, target, client + '/');

                itShouldGenerateOutput(request, target + '/' + client + '/', target, client);
              });
            });
          });
        });
      });
    });
  });
});
