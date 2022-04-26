# HTTP Snippet [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> HTTP Request snippet generator for _many_ languages & tools including: `cURL`, `HTTPie`, `Javascript`, `Node`, `C`, `Java`, `PHP`, `Objective-C`, `Swift`, `Python`, `Ruby`, `C#`, `Go`, `OCaml` and [more](https://github.com/Kong/httpsnippet/wiki/Targets)!

Relies on the popular [HAR](http://www.softwareishard.com/blog/har-12-spec/#request) format to import data and describe HTTP calls.

See it in action on companion service: [APIembed](https://apiembed.com/)

[![Build Status][travis-image]][travis-url] [![Downloads][npm-downloads]][npm-url]

## Install

```shell
# to use in cli
npm install --global httpsnippet

# to use as a module
npm install --save httpsnippet
```

## Usage

```text
  Usage: httpsnippet [options] <files ...>

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -t, --target <target>     target output
    -c, --client [client]     target client library
    -o, --output <directory>  write output to directory
    -x, --extra [{"optionKey": "optionValue"}]  provide extra options for the target/client
```

###### Example

process single file: [`example.json`](test/fixtures/requests/full.json) in [HAR Request Object](http://www.softwareishard.com/blog/har-12-spec/#request) format, or full [HAR](http://www.softwareishard.com/blog/har-12-spec/#log) log format:

```shell
httpsnippet example.json --target node --client unirest --output ./snippets
```

```shell
$ tree snippets
snippets/
└── example.js
```

process multiple files:

```shell
httpsnippet ./*.json --target node --client request --output ./snippets
```

```shell
$ tree snippets/
snippets/
├── endpoint-1.js
├── endpoint-2.js
└── endpoint-3.js
```

provide extra options:

```shell
httpsnippet example.json --target http --output ./snippets -x '{"autoHost": false, "autoContentLength": false}'
```

## API

### HTTPSnippet(source)

#### source

_Required_ Type: `object`

Name of [conversion target](https://github.com/Kong/httpsnippet/wiki/Targets)

```ts
import { HTTPSnippet } from 'httpsnippet';

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request',
});
```

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
  url: 'http://mockbin.com/request',
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
  url: 'http://mockbin.com/request',
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

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](/issues).

## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

For info on creating new conversion targets, please review this [guideline](https://github.com/Kong/httpsnippet/wiki/Creating-Targets)

Moreover, if your pull request contains JavaScript patches or features, you must include relevant unit tests.

Editor preferences are available in the [editor config](.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

[license-url]: https://github.com/Kong/httpsnippet/blob/master/LICENSE
[travis-url]: https://travis-ci.org/Kong/httpsnippet
[travis-image]: https://api.travis-ci.org/Kong/httpsnippet.svg?branch=master
[npm-url]: https://www.npmjs.com/package/httpsnippet
[npm-license]: https://img.shields.io/npm/l/httpsnippet.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/httpsnippet.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/httpsnippet.svg?style=flat-square
