# HTTP Snippet [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> HTTP Request snippet generator for *many* languages & tools including: `cURL`, `HTTPie`, `Javascript`, `Node`, `C`, `Java`, `PHP`, `Objective-C`, `Swift`, `Python`, `Ruby`, `C#`, `Go`, `OCaml` and [more](https://github.com/kong/httpsnippet/wiki/Targets)!

Relies on the popular [HAR](http://www.softwareishard.com/blog/har-12-spec/#request) format to import data and describe HTTP calls.

See it in action on companion service: [APIembed](https://apiembed.com/)

[![Build](https://github.com/readmeio/httpsnippet/workflows/CI/badge.svg)](https://github.com/readmeio/httpsnippet)

## Installation

```shell
npm install --save @readme/httpsnippet
```

## Usage

### HTTPSnippet(source)

#### source

*Required*
Type: `object`

Name of [conversion target](https://github.com/kong/httpsnippet/wiki/Targets)

```js
const HTTPSnippet = require('httpsnippet');

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request'
});
```

### convert(target [, options])

#### target

*Required*
Type: `string`

Name of [conversion target](https://github.com/kong/httpsnippet/wiki/Targets)

#### options

Type: `object`

Target options, *see [wiki](https://github.com/kong/httpsnippet/wiki/Targets) for details*

```js
const HTTPSnippet = require('httpsnippet');

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request'
});

// generate Node.js: Native output
console.log(snippet.convert('node'));

// generate Node.js: Native output, indent with tabs
console.log(snippet.convert('node', {
  indent: '\t'
}));
```

### convert(target [, client, options])

#### target

*Required*
Type: `string`

Name of [conversion target](https://github.com/kong/httpsnippet/wiki/Targets)

#### client

Type: `string`

Name of conversion target [client library](https://github.com/kong/httpsnippet/wiki/Targets)

#### options

Type: `object`

Target options, *see [wiki](https://github.com/kong/httpsnippet/wiki/Targets) for details*

```js
const HTTPSnippet = require('httpsnippet');

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request'
});

// generate Shell: cURL output
console.log(snippet.convert('shell', 'curl', {
  indent: '\t'
}));

// generate Node.js: Unirest output
console.log(snippet.convert('node', 'unirest'));
```

### addTarget(target)
#### target

*Required*
Type: `object`

Representation of a [conversion target](https://github.com/Kong/httpsnippet/wiki/Creating-Targets). Can use this to use targets that are not officially supported.

```js
const customLanguageTarget = require('httpsnippet-for-my-lang');
HTTPSnippet.addTarget(customLanguageTarget);
```

### addTargetClient(target, client)
### target

*Required*
Type: `string`

Name of [conversion target](https://github.com/kong/httpsnippet/wiki/Targets)

### client

*Required*
Type: `object`

Representation of a [conversion target client](https://github.com/Kong/httpsnippet/wiki/Creating-Targets). Can use this to use target clients that are not officially supported.

```js
const customClient = require('httpsnippet-for-my-node-http-client');
HTTPSnippet.addTargetClient('node', customClient);
```

## Documentation

At the heart of this module is the [HAR Format](http://www.softwareishard.com/blog/har-12-spec/#request) as the HTTP request description format, please review some of the sample JSON HAR Request objects in [test fixtures](/test/fixtures/requests), or read the [HAR Docs](http://www.softwareishard.com/blog/har-12-spec/#request) for more details.

For detailed information on each target, please review the [wiki](https://github.com/kong/httpsnippet/wiki).

## Differences from `kong/httpsnippet`

The main difference between this library and the upstream [httpsnippet](https://github.com/Kong/httpsnippet) library are:

* This targets Node 10+
* Does not ship with a CLI component
* Adds a `useObjectBody` option to the `node` and `javascript` targets. This option is a boolean flag that causes the request body to be rendered as an object literal wrapped in `JSON.stringify`. If disabled, it falls back to the original behavior of a stringified object body. This flag defaults to disabled.

## License

[MIT](LICENSE) &copy; [Kong](https://konghq.com)

[license-url]: https://github.com/Kong/httpsnippet/blob/master/LICENSE

[npm-url]: https://www.npmjs.com/package/@readme/httpsnippet
[npm-license]: https://img.shields.io/npm/l/@readme/httpsnippet.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/@readme/httpsnippet.svg?style=flat-square
