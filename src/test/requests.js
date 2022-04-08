const fixtures = require('../fixtures');
const HTTPSnippet = require('../httpsnippet');
const targets = require('../targets/targets');
const shell = require('child_process');

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

const cli = [
  {
    binary: 'node',
    target: 'node',
    clients: ['native'],
  },
  {
    binary: 'php',
    target: 'php',
    clients: ['curl'],
  },
  {
    binary: 'python3',
    target: 'python',
    clients: ['python3'],
  },
];

cli.forEach(({ binary, target, clients }) => {
  describe(`${targets[target].info.title} Request Validation`, () => {
    clients.forEach(clientId => {
      requests.forEach(request => {
        it(`${clientId} request should match fixture for ${request}`, () => {
          const basePath = path.join('fixtures', 'output', target, clientId, request);
          const filePath = `${basePath}.${HTTPSnippet.extname(target)}`;
          const childProcess = shell.exec(`${binary} ${filePath}`);

          let stdout = '';
          childProcess.stdout.on('data', data => {
            stdout += data;
          });

          childProcess.on('exit', () => {
            let har;
            try {
              har = JSON.parse(stdout);
            } catch (err) {
              err.should.be.null();
            }

            // Clone the fixture we're testing against to another object because for multipart/form-data cases we're
            // deleting the header, and if we don't clone the fixture to another object, that deleted header will cause
            // other tests to fail because it's missing where other tests are expecting it.
            const fixture = JSON.parse(JSON.stringify(fixtures.requests[request]));

            // make an exception for multipart/form-data
            if (fixture.headers) {
              fixture.headers.forEach((header, index) => {
                if (
                  header.name.toLowerCase() === 'content-type' &&
                  header.value === 'multipart/form-data'
                ) {
                  delete fixture.headers[index];
                }
              });
            }

            har.should.have.property('log');
            har.log.should.have.property('entries').and.be.Array();
            har.log.entries[0].should.have.property('request');
            // BUG: Mockbin returns http url even when request is for https url
            if (request !== 'https') {
              har.log.entries[0].request.should.containDeep(fixture);
            }
            done();
          });
        });
      });
    });
  });
});
