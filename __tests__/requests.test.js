const fixtures = require('./__fixtures__');
const HTTPSnippet = require('../src');
const targets = require('../src/targets');
const shell = require('child_process');
const { format } = require('util');

const base = './__tests__/__fixtures__/output/';
const requests = [
  'application-form-encoded',
  'application-json',
  'cookies',
  'custom-method',
  'headers',
  'https',
  'multipart-data',
  'multipart-form-data',
  'short',
];

const testData = fixtures.cli.map(cli => {
  return [targets[cli.target].info.title, cli];
});

describe.skip.each(testData)('%s Request Validation', (_, cli) => {
  cli.clients.forEach(function (client) {
    requests.forEach(function (request) {
      it(`${client} request should match mock for ${request}`, () => {
        // let stdout = '';
        const command = format(cli.run, `${base + cli.target}/${client}/${request}${HTTPSnippet.extname(cli.target)}`);

        // Clone the fixture we're testing against to another object because for multipart/form-data cases we're
        // deleting the header, and if we don't clone the fixture to another object, that deleted header will cause
        // other tests to fail because it's missing where other tests are expecting it.
        const fixture = JSON.parse(JSON.stringify(fixtures.requests[request]));

        const stdout = shell.execSync(command);
        const har = JSON.parse(stdout);

        // make an exception for multipart/form-data
        if (fixture.headers) {
          fixture.headers.forEach(function (header, index) {
            if (header.name.toLowerCase() === 'content-type' && header.value === 'multipart/form-data') {
              delete fixture.headers[index];
            }
          });
        }

        expect(har).toHaveProperty('log');
        expect(har.log).toHaveProperty('entries', expect.any(Array));
        expect(har.log.entries[0]).toHaveProperty('request');

        // BUG: Mockbin returns http url even when request is for https url
        if (request !== 'https') {
          // @todo
          // expect(har.log.entries[0].request).toStrictEqual(expect.objectContaining(fixture));
        }
      });
    });
  });
});
