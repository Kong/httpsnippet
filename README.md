# HTTPSnippet

[![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> HTTP Request snippet generator for _many_ languages & tools including: `cURL`, `HTTPie`, `JavaScript`, `Node`, `C`, `Java`, `PHP`, `Objective-C`, `Swift`, `Python`, `Ruby`, `C#`, `Go`, `OCaml` and [more](https://github.com/Kong/httpsnippet/wiki/Targets)!

Relies on the popular [HAR](http://www.softwareishard.com/blog/har-12-spec/#request) format to import data and describe HTTP calls.

See it in action on companion service: [APIembed](https://apiembed.com)

[![Build](https://github.com/Kong/httpsnippet/actions/workflows/build.yml/badge.svg)](https://github.com/Kong/httpsnippet/actions/workflows/build.yml) [![Downloads][npm-downloads]][npm-url]

- [HTTPSnippet](#httpsnippet)
  - [Quickstart](#quickstart)
    - [Core Concepts](#core-concepts)
    - [CLI Quickstart](#cli-quickstart)
    - [TypeScript Library Quickstart](#typescript-library-quickstart)
  - [CLI Usage](#cli-usage)
    - [CLI Installation](#cli-installation)
    - [Example](#example)
  - [TypeScript Library Usage](#typescript-library-usage)
    - [Library Installation](#library-installation)
    - [Types](#types)
      - [`HarRequest`](#harrequest)
      - [`HarEntry`](#harentry)
      - [`TargetId`](#targetid)
      - [`ClientId`](#clientid)
      - [`Converter`](#converter)
      - [`Client`](#client)
      - [`Extension`](#extension)
      - [`TargetInfo`](#targetinfo)
      - [`Target`](#target)
    - [Library Exports](#library-exports)
      - [`new HTTPSnippet(source: HarRequest | HarEntry)`](#new-httpsnippetsource-harrequest--harentry)
      - [`snippet.convert(targetId: string, clientId?: string, options?: T)`](#snippetconverttargetid-string-clientid-string-options-t)
      - [`isTarget`](#istarget)
      - [`addTarget`](#addtarget)
      - [`isClient`](#isclient)
      - [`addTargetClient`](#addtargetclient)
  - [Bugs and feature requests](#bugs-and-feature-requests)
  - [Contributing](#contributing)

## Quickstart

### Core Concepts

1. HTTPSnippet's input is a JSON object that represents an HTTP request in the [HAR Request Object format](http://www.softwareishard.com/blog/har-12-spec).
1. HTTPSnippet's output is executable code that sends the input HTTP request, in a wide variety of languages and libraries.
1. You provide HTTPSnippet your desired `target`, `client`, and `options`.
   - a `target` refers to a group of code generators. Generally, a target is a _programming language_ like `Rust`, `Go`, `C`, or `OCaml`.
   - `client` refers to a more specific generator within the parent target. For example, the `C#` target has two available clients, `httpclient` and `restsharp`, each referring to a popular C# library for making requests.
   - `options` are per client and generally control things like specific indent behaviors or other formatting rules.

### CLI Quickstart

```shell
httpsnippet har.json \ # the path your input file (must be in HAR format)
  --target shell \ # your desired language
  --client curl \ # your desired language library
  --output ./examples \ # an output directory, otherwise will just output to Stdout
  --options '{ "indent": false }' # any client options as a JSON string
```

### TypeScript Library Quickstart

```ts
import { HTTPSnippet } from 'httpsnippet';

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request',
});

const options = { indent: '\t' };
const output = snippet.convert('shell', 'curl', options);
console.log(output);
```

## CLI Usage

### CLI Installation

| NPM                                         | Yarn                                   |
| ------------------------------------------- | -------------------------------------- |
| <pre>npm install --global httpsnippet</pre> | <pre>yarn global add httpsnippet</pre> |

```text
httpsnippet [harFilePath]

the default command

Options:
      --help     Show help                                   [boolean]
      --version  Show version number                         [boolean]
  -t, --target   target output                     [string] [required]
  -c, --client   language client                              [string]
  -o, --output   write output to directory                    [string]
  -x, --options  provide extra options for the target/client  [string]

Examples:
  httpsnippet my_har.json --target rust --client actix --output my_src_directory
```

### Example

The input to HTTPSnippet is any valid [HAR Request Object](http://www.softwareishard.com/blog/har-12-spec/#request), or full [HAR](http://www.softwareishard.com/blog/har-12-spec/#log) log format.

<details>
<summary>`example.json`</summary>

```json
{
  "method": "POST",
  "url": "http://mockbin.com/har?key=value",
  "httpVersion": "HTTP/1.1",
  "queryString": [
    {
      "name": "foo",
      "value": "bar"
    },
    {
      "name": "foo",
      "value": "baz"
    },
    {
      "name": "baz",
      "value": "abc"
    }
  ],
  "headers": [
    {
      "name": "accept",
      "value": "application/json"
    },
    {
      "name": "content-type",
      "value": "application/x-www-form-urlencoded"
    }
  ],
  "cookies": [
    {
      "name": "foo",
      "value": "bar"
    },
    {
      "name": "bar",
      "value": "baz"
    }
  ],
  "postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "foo",
        "value": "bar"
      }
    ]
  }
}
```

</details>

```shell
httpsnippet example.json --target shell --client curl --output ./examples
```

```console
$ tree examples
examples/
└── example.sh
```

inside `examples/example.sh` you'll see the generated output:

```shell
curl --request POST \
  --url 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --cookie 'foo=bar; bar=baz' \
  --data foo=bar
```

provide extra options:

```shell
httpsnippet example.json --target shell --client curl --output ./examples --options '{ "indent": false }'
```

and see how the output changes, in this case without indentation

```shell
curl --request POST --url 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' --header 'accept: application/json' --header 'content-type: application/x-www-form-urlencoded' --cookie 'foo=bar; bar=baz' --data foo=bar
```

## TypeScript Library Usage

### Library Installation

| NPM                                       | Yarn                            |
| ----------------------------------------- | ------------------------------- |
| <pre>npm install --save httpsnippet</pre> | <pre>yarn add httpsnippet</pre> |

### Types

#### `HarRequest`

See <https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/har-format> for the TypeScript type corresponding to this type

#### `HarEntry`

```ts
interface Entry {
  request: Partial<HarRequest>;
}

interface HarEntry {
  log: {
    version: string;
    creator: {
      name: string;
      version: string;
    };
    entries: {
      request: Partial<HarRequest>;
    }[];
  };
}
```

#### `TargetId`

```ts
type TargetId = string;
```

#### `ClientId`

```ts
type ClientId = string;
```

#### `Converter`

```ts
type Converter<T extends Record<string, any>> = (
  request: Request,
  options?: Merge<CodeBuilderOptions, T>,
) => string;
```

#### `Client`

```ts
interface Client<T extends Record<string, any> = Record<string, any>> {
  info: ClientInfo;
  convert: Converter<T>;
}
```

#### `Extension`

```ts
type Extension = `.${string}` | null;
```

#### `TargetInfo`

```ts
interface TargetInfo {
  key: TargetId;
  title: string;
  extname: Extension;
  default: string;
}
```

#### `Target`

```ts
interface Target {
  info: TargetInfo;
  clientsById: Record<ClientId, Client>;
}
```

### Library Exports

#### `new HTTPSnippet(source: HarRequest | HarEntry)`

Name of [conversion target](https://github.com/Kong/httpsnippet/wiki/Targets)

```ts
import { HTTPSnippet } from 'httpsnippet';

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request',
});
```

#### `snippet.convert(targetId: string, clientId?: string, options?: T)`

The `convert` method requires a target ID such as `node`, `shell`, `go`, etc. If no client ID is provided, the default client for that target will be used.

> Note: to see the default targets for a given client, see `target.info.default`. For example [`shell`'s](src/targets/shell/target.ts) target has the default of `curl`.

Many targets provide specific options. Look at the TypeScript types for the target you are interested in to see what options it provides. For example `shell:curl`'s options correspond to the `CurlOptions` interface in [the `shell:curl` client file](src/targets/shell/curl/client.ts).

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

#### `isTarget`

Useful for validating that a custom target is considered valid by HTTPSnippet.

```ts
const isTarget: (target: Target) => target is Target;
```

```ts
import { myCustomTarget } from './my-custom-target';
import { isTarget } from 'httpsnippet';

try {
  console.log(isTarget(myCustomTarget));
} catch (error) {
  console.error(error);
}
```

#### `addTarget`

Use `addTarget` to add a new custom target that you can then use in your project.

```ts
const addTarget: (target: Target) => void;
```

```ts
import { myCustomClient } from './my-custom-client';
import { HAR } from 'my-custom-har';
import { HTTPSnippet, addTargetClient } from 'httpsnippet';

addTargetClient(myCustomClient);

const snippet = new HTTPSnippet(HAR);
const output = snippet.convert('customTargetId');
console.log(output);
```

#### `isClient`

Useful for validating that a custom client is considered valid by HTTPSnippet.

```ts
const isClient: (client: Client) => client is Client;
```

```ts
import { myCustomClient } from './my-custom-client';
import { isClient } from 'httpsnippet';

try {
  console.log(isClient(myCustomClient));
} catch (error) {
  console.error(error);
}
```

#### `addTargetClient`

Use `addTargetClient` to add a custom client to an existing target. See [`addTarget`](#addtarget) for how to add a custom target.

```ts
const addTargetClient: (targetId: TargetId, client: Client) => void;
```

```ts
import { myCustomClient } from './my-custom-client';
import { HAR } from 'my-custom-har';
import { HTTPSnippet, addTargetClient } from 'httpsnippet';

addTargetClient('customTargetId', myCustomClient);

const snippet = new HTTPSnippet(HAR);
const output = snippet.convert('customTargetId', 'customClientId');
console.log(output);
```

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](CONTRIBUTING.md#using-the-issue-tracker) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](/issues).

## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

For info on creating new conversion targets, please review this [guideline](https://github.com/Kong/httpsnippet/wiki/Creating-Targets)

Moreover, if your pull request contains TypeScript patches or features, you must include relevant unit tests.

Editor preferences are available in the [editor config](.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

[license-url]: https://github.com/Kong/httpsnippet/blob/master/LICENSE
[npm-url]: https://www.npmjs.com/package/httpsnippet
[npm-license]: https://img.shields.io/npm/l/httpsnippet.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/httpsnippet.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/httpsnippet.svg?style=flat-square
