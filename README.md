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

### HTTPSnippet(input [, options])

#### input

_Required_ Type: `object`

The [HAR](http://www.softwareishard.com/blog/har-12-spec/#request) request object to generate a snippet for.

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

- `harIsAlreadyEncoded` (`boolean`): In the event of you supplying a `source` HAR that already contains escaped data (query and cookie parameters)strings, this allows you to disable automatic encoding of those parameters to prevent them from being double-escaped.

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
  url: 'https://httpbin.org/anything',
});

// generate Node.js: Native output
console.log(await snippet.convert('node'));

// generate Node.js: Native output, indent with tabs
console.log(
  await snippet.convert('node', {
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
  await snippet.convert('shell', 'curl', {
    indent: '\t',
  }),
);

// generate Node.js: Unirest output
console.log(await snippet.convert('node', 'unirest'));
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

#### Target

_Required_ Type: `string`

Name of [conversion target](https://github.com/Kong/httpsnippet/wiki/Targets)

#### Client

_Required_ Type: `object`

Representation of a [conversion target client](https://github.com/Kong/httpsnippet/wiki/Creating-Targets). Can use this to use target clients that are not officially supported.

```ts
import { customClient } from 'httpsnippet-for-my-node-http-client';
HTTPSnippet.addTargetClient('node', customClient);
```

### addClientPlugin(plugin)

#### Plugin

_Required_ Type: `object`

The client plugin to install.

```ts
addClientPlugin({
  target: 'node',
  client: {
    info: {
      key: 'custom',
      title: 'Custom HTTP library',
      link: 'https://example.com',
      description: 'A custom HTTP library',
      extname: '.custom',
    },
    convert: () => {
      return 'This was generated from a custom client.';
    },
  },
});
```

The above example will create a new `custom` client snippet generator for the `node` target.

## Documentation

At the heart of this module is the [HAR Format](http://www.softwareishard.com/blog/har-12-spec/#request) as the HTTP request description format, please review some of the sample JSON HAR Request objects in [test fixtures](/test/fixtures/requests), or read the [HAR Docs](http://www.softwareishard.com/blog/har-12-spec/#request) for more details.

For detailed information on each target, please review the [wiki](https://github.com/Kong/httpsnippet/wiki).

## Differences from `kong/httpsnippet`

There are some major differences between this library and the [httpsnippet](https://github.com/Kong/httpsnippet) upstream:

- Includes a full integration test suite for a handful of clients and targets.
- Does not ship with a CLI component.
- Does not do any HAR schema validation. It's just assumed that the HAR you're supplying to the library is already valid.
- The main `HTTPSnippet` export contains an `options` argument for an `harIsAlreadyEncoded` option for disabling [escaping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) of cookies and query strings in URLs.
  - We added this because all HARs that we interact with already have this data escaped and this option prevents them from being double encoded, thus corrupting the data.
- Does not support the `insecureSkipVerify` option on `go:native`, `node:native`, `ruby:native`, and `shell:curl` as we don't want snippets generated for our users to bypass SSL certificate verification.
- Includes a full plugin system, `#addClientPlugin`, for quick installation of a target client.
- Node
  - `fetch`
    - Body payloads are treated as an object literal and wrapped within `JSON.stringify()`. We do this to keep those targets looking nicer with those kinds of payloads. This also applies to the JS `fetch` target as well.
  - `request`
    - Does not provide query string parameters in a `params` argument due to complexities with query encoding.
- PHP
  - `guzzle`
    - Snippets have `require_once('vendor/autoload.php');` prefixed at the top.
- Python
  - `python3`
    - Does not ship this client due to its incompatibility with being able to support file uploads.
  - `requests`
    - Does not provide query string parameters in a `params` argument due to complexities with query encoding.

## License

[MIT](LICENSE) &copy; [Kong](https://konghq.com)

[license-url]: https://github.com/Kong/httpsnippet/blob/master/LICENSE
[npm-url]: https://www.npmjs.com/package/@readme/httpsnippet
[npm-license]: https://img.shields.io/npm/l/@readme/httpsnippet.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/@readme/httpsnippet.svg?style=flat-square
