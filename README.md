# HTTP Snippet [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

HTTP Request snippet generator for *most* languages.

Relies on the popular [HAR](http://www.softwareishard.com/blog/har-12-spec/#request) format to import data and describe HTTP calls.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Table of contents
- [Targets](#Targets) 
- [Installation](#installation) 
- [Usage](#usage) 
- [Documentation](#documentation) 
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [License](#license)

## Targets

currently the following output [targets](/src/targets) are supported:

- [cURL](http://curl.haxx.se/)
- [Go](http://golang.org/pkg/net/http/#NewRequest)
- [HTTPie](http://httpie.org)
- Java
  - [Unirest](http://unirest.io/java.html)
- Node.js
  - [Native](http://nodejs.org/api/http.html#http_http_request_options_callback)
  - [Request](https://github.com/request/request)
- OCaml
  - [CoHTTP](https://github.com/mirage/ocaml-cohttp)
- PHP
  - [ext-curl](http://php.net/manual/en/book.curl.php)
- Python
  - [Python 3](https://docs.python.org/3/library/http.client.html)
- [Wget](https://www.gnu.org/software/wget/)

## Installation

install from source or through [npm](https://www.npmjs.com/):

```shell
# to use in cli
npm install --global httpsnippet

# to use as a module
npm install httpsnippet
```

## Usage

### CLI

```
Usage: httpsnippet [options] <file>

Options:

  -h, --help                output usage information
  -V, --version             output the version number
  -t, --target <target>     target output
  -c, --client [client]     target client library
  -o, --output <directory>  write output to directory
  -n, --output-name <name>  output file name
```

#### Example

process single file (assumes [HAR Request Object](http://www.softwareishard.com/blog/har-12-spec/#request) Format):

###### EXAMPLE: *my-api-endpoint.json*

```json
{
  "method": "POST",
  "url": "http://mockbin.com/request",
  "httpVersion": "HTTP/1.1",
  "queryString": [
    { "name": "foo", "value": "bar" },
    { "name": "foo", "value": "baz" },
    { "name": "baz", "value": "abc" }
  ],
  "headers": [
    { "name": "Accept", "value": "text/plain" },
    { "name": "Content-Type", "value": "application/json" },
    { "name": "X-Foo-Bar", "value": "Baz" }
  ],
  "cookies":  [
    { "name": "foo", "value": "bar" },
    { "name": "bar", "value": "baz" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"foo\": \"bar\"}"
  }
}
```
```shell
httpsnippet my-api-endpoint.json --target php --output ./snippets
```

```shell
$ tree snippets
snippets/
└── my-api-endpoint.php
```

process multiple files:

```shell
httpsnippet /*.json --target node --client native --output ./snippets
```

```shell
$ tree sources/
sources/
├── endpoint-1.json
├── endpoint-2.json
└── endpoint-3.json
```

```shell
$ tree snippets/
snippets/
├── endpoint-1.js
├── endpoint-2.js
└── endpoint-3.js
```

### Module

```js
var httpsnippet = require('httpsnippet');

var snippet = new httpsnippet({
  method: 'GET',
  url: 'http://mockbin.com/request'
});

// generate cURL output
console.log(snippet.convert('curl', {
  indent: '\t';
}));

// generate nodeJS output
console.log(snippet.convert('node'));

// generate PHP output
console.log(snippet.convert('php', 'curl'));
```

## Documentation

At the heart of this module is the [HAR Request object](http://www.softwareishard.com/blog/har-12-spec/#request) as the http request description format, please review some of the sample JSON HAR Request objects in [test fixtures](/test/fixtures/requests), or read the [HAR Docs](http://www.softwareishard.com/blog/har-12-spec/#request) for more details.

### Output Targets

output [targets](/src/targets) are simple modules that expose a constructor *(which handles the transformation)* and a meta `info` property.

```js
module.exports = function (opts) {
  // optionally process `opts` object for target specific configuration
  // 
  // process `this.source` object
  // 
  // return processed output as string
};

module.exports.info = {
  key: 'curl',
  title: 'cURL',
  link: 'http://curl.haxx.se/',
  description: 'curl is a command line tool and library for transferring data with URL syntax',
  extname: '.sh'
};
```

### Target Options

### cURL

| Option   | Default | Description                                                              |
| -------- | ------- | ------------------------------------------------------------------------ |
| `short`  | `false` | use short form of cURL CLI options                                       |
| `indent` | `  `    | line break & indent output value, set to `false` to disable line breaks  |

### Go

| Option          | Default | Description                                                              |
| --------------- | ------- | ------------------------------------------------------------------------ |
| `errorChecking` | `false` | add error checking for request, response and body                        |
| `printBody`     | `true`  | include code to print the body as a string                               |
| `timeout`       | `-1`    | sets a request timeout in seconds (requires go 1.3+)                     |

### HTTPie

| Option    | Default | Description                                                                                                                             |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `body`    | `false` | only the response body is printed                                                                                                       |
| `headers` | `false` | only the response headers are printed                                                                                                   |
| `verbose` | `false` | print the whole HTTP exchange (request and response)                                                                                    |
| `print`   | `false` | selects parts of the HTTP exchange, e.g. `--print=Hh` *(see [httpie docs](https://github.com/jakubroztocil/httpie#output-options))*     |
| `cert`    | `false` | use a client side certificate *(see [httpie docs](https://github.com/jakubroztocil/httpie#client-side-ssl-certificate))*                |
| `verify`  | `false` | server SSL certificate verification *(see [httpie docs](https://github.com/jakubroztocil/httpie#server-ssl-certificate-verification))*  |
| `pretty`  | `false` | syntax highlighting *(see [httpie docs](https://github.com/jakubroztocil/httpie#colors-and-formatting))*                                |
| `style`   | `false` | syntax highlighting *(see [httpie docs](https://github.com/jakubroztocil/httpie#colors-and-formatting))*                                |
| `timeout` | `false` | overwrite the default *30s* timeout                                                                                                     |
| `short`   | `false` | use short form of cURL CLI options                                                                                                      |
| `indent`  | `  `    | line break & indent output value, set to `false` to disable line breaks                                                                 |

### Wget

| Option    | Default | Description                                                              |
| --------- | ------- | ------------------------------------------------------------------------ |
| `short`   | `false` | use short form of cURL CLI options                                       |
| `indent`  | `  `    | line break & indent output value, set to `false` to disable line breaks  |
| `verbose` | `false` | by default, `--quiet` is always used, unless `verbose` is set to `true`  |

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](/issues).

## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

More over, if your pull request contains JavaScript patches or features, you must include relevant unit tests.

Editor preferences are available in the [editor config](.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, this project is maintained under the Semantic Versioning guidelines. Sometimes we screw up, but we'll adhere to these rules whenever possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

- Breaking backward compatibility **bumps the major** while resetting minor and patch
- New additions without breaking backward compatibility **bumps the minor** while resetting the patch
- Bug fixes and misc changes **bumps only the patch**

For more information on SemVer, please visit <http://semver.org/>.

## License

Licensed under [The MIT License](LICENSE).

[license-url]: https://github.com/Mashape/httpsnippet/blob/master/LICENSE

[travis-url]: https://travis-ci.org/Mashape/httpsnippet
[travis-image]: https://img.shields.io/travis/Mashape/httpsnippet.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/httpsnippet
[npm-license]: https://img.shields.io/npm/l/httpsnippet.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/httpsnippet.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/httpsnippet.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/Mashape/httpsnippet
[codeclimate-quality]: https://img.shields.io/codeclimate/github/Mashape/httpsnippet.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/Mashape/httpsnippet.svg?style=flat-square

[david-url]: https://david-dm.org/Mashape/httpsnippet
[david-image]: https://img.shields.io/david/Mashape/httpsnippet.svg?style=flat-square
