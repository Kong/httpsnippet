/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-try-expect */
const fixtures = require('./__fixtures__');
const HTTPSnippet = require('../src');
const shell = require('child_process');
const { format } = require('util');

const snippetDir = './__tests__/__fixtures__/output/';

const IGNORED_TARGETS = {
  docker: {
    // We don't actually expose `unirest` in `@readme/oas-to-snippet` so we don't need to test it.
    node: ['unirest'],

    // No need to test these Pear and PECL clients as they don't have much traction anymore.
    php: ['http1', 'http2'],

    // We're only testing `curl` here.
    shell: ['httpie', 'wget'],
  },

  // When running tests locally, or within a Jest CI environment, we shold limit the targets that we're testing so as to
  // not require a mess of dependency requirements that would be better served within a container.
  local: {
    node: ['axios', 'fetch', 'request', 'unirest'], // Only testing `native` locally.
    php: ['guzzle', 'http1', 'http2'], // Only testing `curl` locally.
    python: ['requests'], // Only testing `python3` locally.
    shell: ['httpie', 'wget'], // Only testing `curl`.
  },
};

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
 */
function looseJSONParse(obj) {
  // eslint-disable-next-line no-new-func
  return new Function(`"use strict";return ${obj}`)();
}

const snippets = Object.keys(fixtures.requests)
  .filter(req => !['info', 'index'].includes(req))
  .filter(req =>
    [
      'application-form-encoded',
      'application-json',
      'cookies',
      'custom-method',
      'full',
      'headers',
      'http-insecure',
      'jsonObj-multiline',
      'jsonObj-null-value',
      // 'multipart-data', // Disabling because there's some quirks with cURL.
      'multipart-form-data',
      // 'multipart-file', // Disabling because there's some quirks with newlines.
      'nested',
      'query-encoded',
      'query',
      'short',
      'text-plain',
    ].includes(req)
  )
  .map(req => [req]);

const clients = HTTPSnippet.availableTargets()
  .filter(client => client.cli)
  .map(client => {
    if (process.env.HTTPBIN) {
      if (process.env.INTEGRATION_CLIENT === client.key) {
        if (client.key in IGNORED_TARGETS.docker) {
          return {
            ...client,
            clients: client.clients.filter(target => !IGNORED_TARGETS.docker[client.key].includes(target.key)),
          };
        }

        return client;
      }
    } else if (process.env.NODE_ENV === 'test') {
      switch (client.key) {
        case 'node':
        case 'php':
        case 'python':
        case 'shell':
          return {
            ...client,
            clients: client.clients.filter(target => !IGNORED_TARGETS.local[client.key].includes(target.key)),
          };

        default:
          return false;
      }
    }

    // If we don't have any special cases set up for the client then just ignore it.
    return false;
  })
  .filter(Boolean)
  .map(client => ({ ...client, clients: client.clients.map(target => [target.key, target]) }))
  .map(client => [client.title, client]);

if (!clients.length) {
  throw new Error('No available clients for this environment.');
}

describe.each(clients)('%s', (_, client) => {
  describe.each(client.clients)('%s', (__, target) => {
    it.each(snippets)('should return the expected response for `%s`', snippet => {
      // Clone the fixture we're testing against to another object because for multipart/form-data cases we're
      // deleting the header, and if we don't clone the fixture to another object, that deleted header will cause
      // other tests to fail because it's missing where other tests are expecting it.
      let har = JSON.parse(JSON.stringify(fixtures.requests[snippet]));
      let url;
      if (har.log) {
        url = har.log.entries[0].request.url;
        har = har.log.entries[0].response;
      } else {
        url = har.url;
      }

      const command = format(
        client.cli,
        `${snippetDir}${client.key}/${target.key}/${snippet}${HTTPSnippet.extname(client.key)}`
      );

      let stdout;
      try {
        stdout = shell.execSync(command);
      } catch (err) {
        // If this target throws errors when it can't access a method on the server that doesn't exist let's make sure
        // that it only did that on the `custom-method` test, otherwise something went wrong!
        if (err.message.includes('405 METHOD NOT ALLOWED')) {
          expect(snippet).toBe('custom-method');
          return;
        }

        throw err;
      }

      // If the endpoint we're testing against returns HTML we should do a string comparison instead of parsing a
      // non-existent JSON response.
      if (har.headers.find(header => header.name === 'Content-Type' && header.value === 'text/html')) {
        const stdoutTrimmed = stdout.toString().trim();

        try {
          expect(stdoutTrimmed).toStrictEqual(har.content.text);
        } catch (err) {
          // Some targets always assume that their response is JSON and for this case (`custom-method`) will print out
          // an empty string instead.
          expect(stdoutTrimmed).toStrictEqual('');
        }
        return;
      }

      const expected = JSON.parse(har.content.text);
      let response;
      try {
        response = JSON.parse(stdout);
      } catch (err) {
        // Some JS targets print out their response with `console.log(json)` which creates a JSON object that we can't
        // access with `JSON.parse()`.
        //
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
        if (client.extname !== '.js') {
          throw err;
        }

        response = looseJSONParse(stdout);
      }

      // If we're testing against the `/cookies` or `/headers` endpoints it returns a different schema than
      // everything else.
      if (url === 'https://httpbin.org/cookies') {
        expect(response.cookies).toStrictEqual(expected.cookies);
        return;
      } else if (url === 'https://httpbin.org/headers') {
        expect(response.headers).toStrictEqual(
          expect.objectContaining({
            ...expected.headers,
          })
        );

        return;
      }

      expect(response.args).toStrictEqual(expected.args);
      expect(response.files).toStrictEqual(expected.files);
      expect(response.form).toStrictEqual(expected.form);
      expect(response.method).toStrictEqual(expected.method);
      expect(response.url).toStrictEqual(expected.url);

      // Because some JS targets may be returning their payloads with `console.log()` that method has a default depth,
      // at which point it turns objects into `[Object]`. When we then run that through `looseJSONParse` it gets
      // transformed again into `[ [Function: Object] ]`. Since we don't have access to the original object context
      // from the target snippet, we rewrite our response a bit so that it can partially match what we're looking for.
      //
      // Of course the side effect to this is is that now these test cases may be subject to flakiness but without
      // updating the root snippets to not use `console.log()`, which we don't want to do, this is the way it's got to
      // be.
      if (snippet === 'application-json' && client.extname === '.js') {
        const respJSON = response.json;
        respJSON.arr_mix[2] = { arr_mix_nested: {} };

        expect(respJSON).toStrictEqual(expected.json);
      } else {
        expect(response.json).toStrictEqual(expected.json);
      }

      // If we're dealing with a JSON payload, some snippets add indents and new lines to the data that is sent to
      // HTTPBin (that it then returns back us in the same format) -- to make this `data` check target agnostic we
      // need to parse and re-stringify our expectations so that this test can universally match them all.
      if (expected.headers?.['Content-Type']?.includes('application/json')) {
        expect(JSON.stringify(JSON.parse(response.data))).toStrictEqual(JSON.stringify(JSON.parse(expected.data)));
      } else {
        expect(response.data).toStrictEqual(expected.data);
      }

      // `multipart/form-data` needs some special tests to assert that boundaries were sent and received properly.
      if (expected.headers?.['Content-Type']?.includes('multipart/form-data')) {
        if (expected.headers['Content-Type'] === response.headers['Content-Type']) {
          // If the headers match identically, great! If not we need to make sure that there's a boundary set up.
        } else {
          // It doesn't matter that the /right/ boundary is set up because some targets may add their own, we just
          // need to make sure that **a** boundary is present.
          const contentTypes = expected.headers['Content-Type'].split(';').map(p => p.trim());
          expect(contentTypes).toHaveLength(2);
          expect(contentTypes.map(type => type.includes('boundary=')).filter(Boolean)).toHaveLength(1);
        }
      } else {
        expect(response.headers).toStrictEqual(
          expect.objectContaining({
            ...expected.headers,
          })
        );
      }
    });
  });
});
