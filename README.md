# HTTPSnippet-lite

[![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> HTTP Request snippet generator for _many_ languages & tools including: `cURL`, `HTTPie`, `JavaScript`, `Node`, `C`, `Java`, `PHP`, `Objective-C`, `Swift`, `Python`, `Ruby`, `C#`, `Go`, `OCaml` and [more](https://github.com/Kong/httpsnippet/wiki/Targets)!

Relies on the popular [HAR](http://www.softwareishard.com/blog/har-12-spec/#request) format to import data and describe HTTP calls.

[![Build](https://github.com/httpsnippet-lite/workflows/CI/badge.svg)](https://github.com/httpsnippet-lite)

- [HTTPSnippet](#httpsnippet-lite)
  - [Quickstart](#quickstart)
    - [Core Concepts](#core-concepts)
    - [CLI Quickstart](#cli-quickstart)
    - [TypeScript Library Quickstart](#typescript-library-quickstart)
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
npm install --save httpsnippet-lite
```

### TypeScript Library Quickstart

```ts
import { HTTPSnippet } from 'httpsnippet-lite';

const snippet = new HTTPSnippet({
  method: 'GET',
  url: 'http://mockbin.com/request',
});

const options = { indent: '\t' };
const output = await snippet.convert('shell', 'curl', options);
console.log(output);
```

## TypeScript Library Usage

### Library Installation

| NPM                                            | Yarn                                 |
|------------------------------------------------|--------------------------------------|
| <pre>npm install --save httpsnippet-lite</pre> | <pre>yarn add httpsnippet-lite</pre> |

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
import { HTTPSnippet } from 'httpsnippet-lite';

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
console.log(await snippet.convert('node'));

// generate Node.js: Native output, indent with tabs
console.log(
  await snippet.convert('node', {
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
import { isTarget } from 'httpsnippet-lite';

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
import { HTTPSnippet, addTargetClient } from 'httpsnippet-lite';

addTargetClient(myCustomClient);

const snippet = new HTTPSnippet(HAR);
const output = await snippet.convert('customTargetId');
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

## Documentation

At the heart of this module is the [HAR Format](http://www.softwareishard.com/blog/har-12-spec/#request) as the HTTP request description format, please review some of the sample JSON HAR Request objects in [test fixtures](/test/fixtures/requests), or read the [HAR Docs](http://www.softwareishard.com/blog/har-12-spec/#request) for more details.

For detailed information on each target, please review the [wiki](https://github.com/Kong/httpsnippet/wiki).

## Differences from `kong/httpsnippet`

Here's a list of the most significant differences between httpsnippet-lite and [httpsnippet](https://github.com/Kong/httpsnippet) upstream:

* No reliance on Node.js core modules and globals
* convert() method is async
* HAR is not validated
* CLI is not bundled
* Dual packaging available

## License

[MIT](LICENSE) &copy; [Kong](https://konghq.com)

[license-url]: https://github.com/Kong/httpsnippet/blob/master/LICENSE

[npm-url]: https://www.npmjs.com/package/httpsnippet-lite
[npm-license]: https://img.shields.io/npm/l/httpsnippet-lite.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/httpsnippet-lite.svg?style=flat-square
