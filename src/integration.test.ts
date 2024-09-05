/* eslint-disable vitest/no-conditional-expect */
import type { AvailableTarget } from './helpers/utils.js';
import type { Request } from './index.js';
import type { TargetId } from './targets/index.js';
import type { Response } from 'har-format';

import shell from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { format } from 'node:util';

import { describe, test, expect } from 'vitest';

import { availableTargets, extname } from './helpers/utils.js';

const expectedBasePath = ['src', 'fixtures', 'requests'];

const ENVIRONMENT_CONFIG = {
  docker: {
    // Every client + target that we test in an HTTPBin-powered Docker environment.
    c: ['libcurl'],
    csharp: ['httpclient', 'restsharp'],
    go: ['native'],
    node: ['axios', 'fetch'],
    php: ['curl', 'guzzle'],
    python: ['requests'],
    shell: ['curl'],
  },
  local: {
    // When running tests locally, or within a CI environment, we shold limit the targets that
    // we're testing so as to not require a mess of dependency requirements that would be better
    // served within a container.
    node: ['fetch'],
    php: ['curl'],
    python: ['requests'],
    shell: ['curl'],
  },
};

// Some environments are not as simple as `interpreter <file>` Here is where we
// put the instructions for how to run those environments in our docker
// containers
const EXEC_FUNCTION: Record<string, (arg: string) => Buffer> = {
  csharp: (fixturePath: string) => {
    // - copy the given fixture into a file called Program.cs - c# expects
    //   there to be only one file with top-level code in any project, so we'll
    //   keep this project around but copy each fixture in as Program.cs
    // - run Program.cs and return the output
    shell.execSync(`cp ${fixturePath} /src/IntTestCsharp/Program.cs`);
    return shell.execSync('cd /src/IntTestCsharp && dotnet run Program.cs');
  },
  c: (fixturePath: string) => {
    const inf = `/tmp/${path.basename(fixturePath, '.c')}.c`;
    const exe = `/tmp/${path.basename(fixturePath, '.c')}`;
    writeFileSync(
      inf,
      `
#include <curl/curl.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  ${readFileSync(fixturePath, 'utf8')}
}`,
    );
    shell.execSync(`gcc ${inf} -o ${exe} -lcurl`);
    return shell.execSync(exe);
  },
  go: (fixturePath: string) => {
    return shell.execSync(`go run ${fixturePath}`);
  },
};

const inputFileNames = readdirSync(path.join(...expectedBasePath), 'utf-8');

const fixtures: [string, Request][] = inputFileNames.map(inputFileName => [
  inputFileName.replace(path.extname(inputFileName), ''),
  // eslint-disable-next-line import/no-dynamic-require, global-require
  require(path.resolve(...expectedBasePath, inputFileName)),
]);

/** ignore a set of fixtures from being run in tests */
const fixtureIgnoreFilter: string[] = [
  // Some targets don't support native file handling without supplying a raw boundary header and
  // because the HAR for `multipart-file` doesn't include the files contents, just its filename
  // running one of these generated snippets doesn't send anything for the file because the
  // FormData API rewrites the incoming full path of `src/fixtures/files/hello.txt` to just
  // `hello.txt`. Instead of monkeypatching these targets to have the full file path at time ofb
  // this execution suite we're just ignoring this test case as file uploading is well covered by
  // the other cases we have.
  'multipart-file',
];

const environmentFilter = (): string[] => {
  if (process.env.HTTPBIN) {
    return Object.keys(ENVIRONMENT_CONFIG.docker);
  } else if (process.env.NODE_ENV === 'test') {
    return Object.keys(ENVIRONMENT_CONFIG.local);
  }

  throw new Error('Unsupported environment supplied to `environmentFilter`.');
};

const clientFilter = (target: TargetId): string[] => {
  if (process.env.HTTPBIN) {
    return ENVIRONMENT_CONFIG.docker[target];
  } else if (process.env.NODE_ENV === 'test') {
    return ENVIRONMENT_CONFIG.local[target];
  }

  throw new Error('Unsupported environment supplied to `clientFilter`.');
};

const testFilter =
  <T>(property: keyof T, list: T[keyof T][], ignore = false) =>
  (item: T) => {
    if (!list.length) {
      return true;
    } else if (ignore) {
      return list.length > 0 ? !list.includes(item[property]) : true;
    }

    return list.length > 0 ? list.includes(item[property]) : true;
  };

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
 */
function looseJSONParse(obj: any) {
  // eslint-disable-next-line no-new-func
  return new Function(`"use strict";return ${obj}`)();
}

// eslint-disable-next-line vitest/require-hook
availableTargets()
  .filter(target => target.cli)
  .filter(testFilter('key', environmentFilter()))
  .forEach(target => {
    const { key: targetId, title, clients } = target;

    describe.skipIf(process.env.NODE_ENV === 'test')(`${title} integration tests`, () => {
      // eslint-disable-next-line vitest/require-hook
      clients.filter(testFilter('key', clientFilter(target.key))).forEach(({ key: clientId }) => {
        // If we're in an HTTPBin-powered Docker environment we only want to run tests for the
        // client that our Docker has been configured for.
        const shouldSkip = process.env.HTTPBIN && process.env.INTEGRATION_CLIENT !== targetId;

        describe.skipIf(shouldSkip)(clientId, () => {
          // eslint-disable-next-line vitest/require-hook
          fixtures.filter(testFilter(0, fixtureIgnoreFilter, true)).forEach(([fixture, request]) => {
            if (fixture === 'custom-method' && clientId === 'restsharp') {
              // restsharp doesn't even let you express calling an invalid
              // method, there's no point in testing it against this particular
              // fixture
              return;
            }

            integrationTest(clientId, target, fixture, request);
          });
        });
      });
    });
  });

function integrationTest(
  clientId: string,
  { key: targetId, cli: targetCLI }: AvailableTarget,
  fixture: string,
  request: Request,
) {
  test(`should return the expected response for \`${fixture}\``, () => {
    const fixtureExtension = extname(targetId, clientId);
    const basePath = path.join('src', 'targets', targetId, clientId, 'fixtures', `${fixture}${fixtureExtension}`);

    // Clone the fixture we're testing against to another object because for multipart cases
    // we're deleting the header, and if we don't clone the fixture to another object, that
    // deleted header will cause other tests to fail because it's missing where other tests
    // are expecting it.
    const har = JSON.parse(JSON.stringify(request));
    const url = har.log.entries[0].request.url;
    const harResponse = har.log.entries[0].response as Response;

    let stdout;
    try {
      // If there's a runner function, use that; otherwise just call
      // <interpreter> <fixture-path>
      if (EXEC_FUNCTION[targetId]) {
        stdout = EXEC_FUNCTION[targetId](basePath);
      } else {
        stdout = shell.execSync(format(targetCLI, basePath));
      }
    } catch (err) {
      // If this target throws errors when it can't access a method on the server that
      // doesn't exist let's make sure that it only did that on the `custom-method` test,
      // otherwise something went wrong!
      if (err.message.toLowerCase().match(/405/)) {
        expect(fixture).toBe('custom-method');
        return;
      }

      throw err;
    }

    stdout = stdout.toString().trim();

    // If the endpoint we're testing against returns HTML we should do a string comparison
    // instead of parsing a non-existent JSON response.
    if (harResponse.headers.find(header => header.name === 'Content-Type' && header.value === 'text/html')) {
      // const stdoutTrimmed = stdout.toString().trim();

      try {
        expect(stdout).toStrictEqual(harResponse.content.text);
      } catch (err) {
        // Some targets always assume that their response is JSON and for this case
        // (`custom-method`) will print out an empty string instead.
        expect(stdout).toBe('');
      }

      return;
    }

    const expected = JSON.parse(String(harResponse.content.text));
    let response: any;
    try {
      response = JSON.parse(stdout);
    } catch (err) {
      // Some JS targets print out their response with `console.log(json)` which creates
      // a JSON object that we can't access with `JSON.parse()`.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!
      if (!['.js', '.cjs'].includes(fixtureExtension)) {
        throw err;
      }

      response = looseJSONParse(stdout);
    }

    // If we're testing against the `/cookies` or `/headers` endpoints it returns a
    // different schema than everything else.
    if (url === 'https://httpbin.org/cookies') {
      expect(response.cookies).toStrictEqual(expected.cookies);
      return;
    } else if (url === 'https://httpbin.org/headers') {
      expect(response.headers).toStrictEqual(
        expect.objectContaining({
          ...expected.headers,
        }),
      );

      return;
    }

    expect(response.args).toStrictEqual(expected.args);

    // Some targets send files that have a new line at the end of them without that new
    // line so we need to make our assertion universal across all targets.
    let files = {};
    if (Object.keys(response.files || {}).length) {
      files = Object.entries(response.files)
        .map(([k, v]) => ({ [k]: String(v).trim() }))
        .reduce((prev, next) => Object.assign(prev, next));
    }

    expect(files).toStrictEqual(expected.files);

    expect(response.form || {}).toStrictEqual(expected.form);
    expect(response.method).toStrictEqual(expected.method);
    expect(response.url).toStrictEqual(expected.url);

    // Because some JS targets may be returning their payloads with `console.log()` that
    // method has a default depth, at which point it turns objects into `[Object]`. When
    // we then run that through `looseJSONParse` it gets transformed again into
    // `[ [Function: Object] ]`. Since we don't have access to the original object context
    // from the target snippet, we rewrite our response a bit so that it can partially
    // match what we're looking for.
    //
    // Of course the side effect to this is is that now these test cases may be subject
    // to flakiness but without updating the root snippets to not use `console.log()`,
    // which we don't want to do, this is the way it's got to be.
    if (fixture === 'application-json' && ['.js', '.cjs'].includes(fixtureExtension)) {
      const respJSON = response.json;
      respJSON.arr_mix[2] = { arr_mix_nested: [] };

      expect(respJSON).toStrictEqual(expected.json);
    } else {
      expect(response.json).toStrictEqual(expected.json);
    }

    const expectJson = expected.headers?.['Content-Type']?.[0].includes('application/json');
    // if there is a request header containing "multipart/form-data", we're
    // expecting a multipart response. We can't check the expected headers here
    // because in the case of multipart-form-data-no-params, we don't want to
    // assert that the request contained a content-type, since there was no
    // content
    const expectMultipart = har.log.entries[0].request.headers
      ?.find((x: { name: string; value: string }) => x.name.toLowerCase().includes('content-type'))
      ?.value?.includes('multipart/form-data');

    // If we're dealing with a JSON payload, some snippets add indents and new lines to
    // the data that is sent to
    // HTTPBin (that it then returns back us in the same format) -- to make this `data`
    // check target agnostic we need to parse and re-stringify our expectations so that
    // this test can universally match them all.
    if (expectJson) {
      // In our postdata-malformed fixture we're sending a POST payload without any
      // content so what HTTPBin sends back to us is a `json: null` and `data: ''`, which
      // we need to specially assert here as running `JSON.parse()` on an empty string
      // will throw an exception.
      if (fixture === 'postdata-malformed' && response.data === '') {
        expect(expected.data).toBe('');
      } else {
        expect(JSON.stringify(JSON.parse(response.data))).toStrictEqual(JSON.stringify(JSON.parse(expected.data)));
      }
      // httpbin-go includes multipart/form-data in the `data` response
      // field, which I think is sensible. In this case, the response
      // includes a randomly-generated boundary and is difficult to
      // sensibly match against, so don't check the data attribute
    } else if (!expectMultipart) {
      expect(response.data).toStrictEqual(expected.data);
    }

    // `multipart/form-data` needs some special tests to assert that boundaries were sent
    // and received properly.
    if (expectMultipart) {
      // if the Content type headers don't match identically, check that there
      // is a boundary present in the data. If they do match exactly, no need
      // to do anything; we tested what we wanted
      //
      // Except the "multipart-form-data-no-params" fixture, because in this
      // test there is no content and so libraries should not be required to
      // send a content-type header
      if (
        expected.headers['Content-Type']?.[0] !== response.headers['Content-Type']?.[0] &&
        fixture !== 'multipart-form-data-no-params'
      ) {
        const contentTypes: string[] = response.headers['Content-Type'][0].split(';').map((p: string) => p.trim());

        expect(contentTypes).toHaveLength(2);
        expect(contentTypes.map(type => type.includes('boundary=')).filter(Boolean)).toHaveLength(1);
      }
    } else {
      // Content-type headers particularly may contain the text-encoding, so we
      // can't check for exact equality. For example, "Content-Type:
      // text/plain; charset=utf-8" is perfectly valid and we don't want to
      // fail it for not having the `text/plain` content type. In the future,
      // we may want to try and be more smart about parsing the header value,
      // but for now, just check that the expected header value is contained
      // anywhere within the received header
      const headers = expected.headers as Record<string, string[]>;
      Object.entries(headers).forEach(([name, value]) => {
        // In the postdata-malformed fixture, we're sending a POST without any
        // body. Some libraries absolutely refuse to add an `application/json`
        // content-type header for a request without a body, which I think is
        // sensible. Allow those cases to pass rather than going long miles to
        // force libraries to act stupidly.
        if (name === 'Content-Type' && fixture === 'postdata-malformed') {
          return;
        }
        expect(response.headers).toHaveProperty(name);
        expect(response.headers[name][0]).toContain(value[0]);
      });
    }
  });
}
