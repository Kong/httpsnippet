# HTTP Snippet [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> HTTP Request snippet generator for _many_ languages & tools including: `cURL`, `HTTPie`, `Javascript`, `Node`, `C`, `Java`, `PHP`, `Objective-C`, `Swift`, `Python`, `Ruby`, `C#`, `Go`, `OCaml` and [more](https://github.com/Kong/httpsnippet/wiki/Targets)!

Relies on the popular [HAR](http://www.softwareishard.com/blog/har-12-spec/#request) format to import data and describe HTTP calls.

See it in action on [ReadMe](https://docs.readme.com/reference/getopenroles).

[![Build](https://github.com/readmeio/httpsnippet/workflows/CI/badge.svg)](https://github.com/readmeio/httpsnippet)

## Installation

```shell
npm install --save @readme/httpsnippet
```

## Usage

### HTTPSnippet(source [, options])

#### source

_Required_ Type: `object`

Name of [conversion target](https://github.com/Kong/httpsnippet/wiki/Targets)

```ts
import { HTTPSnippet } from 'httpsnippet';

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'https://httpbin.org/anything',
});
```

#### options

Type: `object`

Available options:

* `harIsAlreadyEncoded` (`boolean`): In the event of you supplying a `source` HAR that already contains escaped data (query and cookie parameters)strings, this allows you to disable automatic encoding of those parameters to prevent them from being double-escaped.

### convert(target [, options])

#### target

_Required_ Type: `string`

Name of [conversion target](https://github.com/Kong/httpsnippet/wiki/Targets)

#### options

Type: `object`

Target options, _see [wiki](https://github.com/Kong/httpsnippet/wiki/Targets) for details_

```ts
import { HTTPSnippet } from 'httpsnippet';

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'httsp://httpbin.org/anything',
});

// generate Node.js: Native output
console.log(snippet.convert('node'));

// generate Node.js: Native output, indent with tabs
console.log(
  snippet.convert('node', {
    indent: '\t',
  }),
);
```

### convert(target [, client, options])

#### Target

_Required_ Type: `string`

Name of [conversion target](https://github.com/Kong/httpsnippet/wiki/Targets)

#### Client

Type: `string`

Name of conversion target [client library](https://github.com/Kong/httpsnippet/wiki/Targets)

#### Options

Type: `object`

Target options, _see [wiki](https://github.com/Kong/httpsnippet/wiki/Targets) for details_

```ts
import { HTTPSnippet } from 'httpsnippet';

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'https://httpbin.org/anything',
});

// generate Shell: cURL output
console.log(
  snippet.convert('shell', 'curl', {
    indent: '\t',
  }),
);

// generate Node.js: Unirest output
console.log(snippet.convert('node', 'unirest'));
```

### addTarget(target)

#### target

_Required_ Type: `object`

Representation of a [conversion target](https://github.com/Kong/httpsnippet/wiki/Creating-Targets). Can use this to use targets that are not officially supported.

```ts
import { customLanguageTarget } from 'httpsnippet-for-my-lang';
HTTPSnippet.addTarget(customLanguageTarget);
```

### addTargetClient(target, client)

### Target

_Required_ Type: `string`

Name of [conversion target](https://github.com/Kong/httpsnippet/wiki/Targets)

### Client

_Required_ Type: `object`

Representation of a [conversion target client](https://github.com/Kong/httpsnippet/wiki/Creating-Targets). Can use this to use target clients that are not officially supported.

```ts
import { customClient } from 'httpsnippet-for-my-node-http-client';
HTTPSnippet.addTargetClient('node', customClient);
```

## Documentation

At the heart of this module is the [HAR Format](http://www.softwareishard.com/blog/har-12-spec/#request) as the HTTP request description format, please review some of the sample JSON HAR Request objects in [test fixtures](/test/fixtures/requests), or read the [HAR Docs](http://www.softwareishard.com/blog/har-12-spec/#request) for more details.

For detailed information on each target, please review the [wiki](https://github.com/Kong/httpsnippet/wiki).

## Differences from `kong/httpsnippet`

The main difference between this library and the upstream [httpsnippet](https://github.com/Kong/httpsnippet) library are:

* Does not ship with a CLI component.
* The `fetch` target for Node and JS both treat body payloads as an object literal and wrap it within `JSON.stringify()`. We do this to keep those targets looking nicer with those kinds of payloads.
* Contains a `harIsAlreadyEncoded` option on the core library to disable [escaping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) of cookies and query strings in URLs. Helpful if the HAR being supplied already has them escaped.
* PHP Guzzle snippets come with `require_once('vendor/autoload.php');` at the top of them.
* A full integration suite for testing out snippets the library creates.
* This library does not ship a Python client for [http.client](https://docs.python.org/3/library/http.client.html) due to its limitations in supporting file uploads.
* The Python client for [Requests](http://docs.python-requests.org/en/latest/api/#requests.request) does not provide query string parameters in a `params` argument due to complexities with query encoding.
* The Node `request` client does not specify query parameters in the `qs` option due to query encoding complexities.

### Running the integration suite

```
docker-compose run integration_node
docker-compose run integration_php
docker-compose run integration_python
docker-compose run integration_shell
```

## License

[MIT](LICENSE) &copy; [Kong](https://konghq.com)

[license-url]: https://github.com/Kong/httpsnippet/blob/master/LICENSE

[npm-url]: https://www.npmjs.com/package/@readme/httpsnippet
[npm-license]: https://img.shields.io/npm/l/@readme/httpsnippet.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/@readme/httpsnippet.svg?style=flat-square
