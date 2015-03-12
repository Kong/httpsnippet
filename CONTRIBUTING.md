# Contributing to this project

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.

## Using the issue tracker

The [issue tracker](/issues) is the preferred channel for [bug reports](#bug-reports),
[features requests](#feature-requests) and [submitting pull requests](#pull-requests), 
but please respect the following restrictions:

* Please **do not** use the issue tracker for personal support requests (use
  [Stack Overflow](http://stackoverflow.com) or IRC).

* Please **do not** derail or troll issues. Keep the discussion on topic and
  respect the opinions of others.

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; create a [reduced test
   case](http://css-tricks.com/6263-reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? What would you expect to be the outcome? All these
details will help people to fix any potential bugs.

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to *you* to make a strong
case to convince the project's developers of the merits of this feature. Please
provide as much detail and context as possible.

## Pull requests

Good pull requests (patches, improvements, new features) are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

Please adhere to the coding conventions used throughout a project (indentation,
accurate comments, etc.) and any other requirements (such as test coverage).

Follow this process if you'd like your work considered for inclusion in the
project:

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/<repo-name>
   # Navigate to the newly cloned directory
   cd <repo-name>
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/mashape/httpsnippet.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout <dev-branch>
   git pull upstream <dev-branch>
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream <dev-branch>
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

**IMPORTANT**: By submitting a patch, you agree to allow the project owner to
license your work under the same license as that used by the project.

## Creating New Conversion Targets

Please start by browsing for [available targets](/src/targets) and inspect each implementation.

a target is a simple module with a constructor that accepts two parameters: `source` and `options`, 
where `source` is the HAR Object to process, and `options` is an optional object with any target 
specific flags *(used for customizing the output)*.

### Conversion Rules

1. start by reading an understanding the [HAR](http://www.softwareishard.com/blog/har-12-spec/#request) format.
2. utilize utility properties created for convenience (`source.headersObj`, `source.uriObj` etc ...) *see below for mode details*
3. follow the guidelines below for best practices and consistency.

### Guidelines

Using the following example of a request object, HTTP Snippet will pre-process data and create some additional properties:

| property                    | description                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source.fullUrl`            | the full & final url, including all query string values                                                                                           |
| `source.uriObj`             | the url parsed with `url.parse()`. compatible with `url.format`                                                                                   |
| `source.queryObj`           | a key => value pair, "normalized" version of `source.queryString`, adds additional query string values from the `source.url`                      |
| `source.headersObj`         | a key => value pair, "normalized" version of `source.headers`, header names are lowercased                                                        |
| `source.allHeaders`         | same as `source.headersObj` but with `cookies` header and populated from `source.cookies` array                                                   |
| `source.postData.jsonObj`   | the parsed value of `source.postData.text`, only for `source.postData.mimeType` = `application/json` *(or equivalent mimeTypes)*                  |  
| `source.postData.paramsObj` | a key => value pair, "normalized" version of `source.postData.params`, only for `source.postData.mimeType` = `application/x-www-form-urlencoded`  | 

###### Sample Incoming Request Object

```js
{
  method: 'POST',
  url: 'http://mockbin.com/har?key=value',
  httpVersion: 'HTTP/1.1',
  queryString: [
    { name: 'foo', value: 'bar' },
    { name: 'foo', value: 'baz' },
    { name: 'baz', value: 'abc' }
  ],
  headers: [
    { name: 'Accept', value: 'application/json' },
    { name: 'Content-Type', value: 'application/x-www-form-urlencoded' }
  ],

  cookies:  [
    { name: 'foo', value: 'bar' },
    { name: 'bar', value: 'baz' }
  ],

  postData: {
    mimeType: 'application/x-www-form-urlencoded',
    params: [
      { name: 'foo', value: 'bar' },
      { name: 'foo', value: 'baz' },
      { name: 'baz', value: 'abc' }
    ]
  }
}
```

###### Processed Source Object

```js
{
  method: 'POST',

  // the base url value stripped of any the query string
  url: 'http://mockbin.com/har',

  // the full & final url, including all query string values
  fullUrl: 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value',

  // the url parsed with url.parse()
  // compatible with url.format
  uriObj: {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'mockbin.com',
    port: null,
    hostname: 'mockbin.com',
    hash: null,
    search: 'key=value&baz=abc&foo=bar&foo=baz',
    query: { key: 'value', baz: 'abc', foo: [Object] },
    pathname: '/har',
    path: '/har?key=value&baz=abc&foo=bar&foo=baz',
    href: 'http://mockbin.com/har'
  },

  httpVersion: 'HTTP/1.1',

  // added to pass har-validator
  bodySize: 0,

  // added to pass har-validator
  headersSize: 0,

  queryString: [
    { name: 'foo', value: 'bar' },
    { name: 'foo', value: 'baz' },
    { name: 'baz', value: 'abc' }
  ],

  // "normalized" version of `queryString`
  // adds any additional query string values from the url
  // compatible with "querystring" node module
  queryObj: {
    key: 'value',
    baz: 'abc',
    foo: [ 'bar', 'baz' ]
  },

  headers: [
    { name: 'Accept', value: 'application/json' },
    { name: 'Content-Type', value: 'application/x-www-form-urlencoded' }
  ],

  // normalized headers array into a key => value object pair
  // header names are lowercased
  headersObj: {
    'accept': 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },

  // same as headersObj but with Cookies added (if any exist in cookies array)
  allHeaders: {
    'accept': 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    'cookie': 'foo=bar; bar=baz'
  },

  cookies:  [
    { name: 'foo', value: 'bar' },
    { name: 'bar', value: 'baz' }
  ],

  // see below for different scenarios
  postData: [Object]
}
```

###### application/x-www-form-urlencoded

```js
postData: {
  // added to pass har-validator
  size: 0,

  // original value
  mimeType: 'application/x-www-form-urlencoded',

  // original value
  params: [
    { name: 'foo', value: 'bar' },
    { name: 'foo', value: 'baz' },
    { name: 'baz', value: 'abc' }
  ],

  // "normalized" version of `params`
  // compatible with "querystring" node module
  paramsObj: {
    key: 'value',
    baz: 'abc',
    foo: [ 'bar', 'baz' ]
  }

  // the raw body in plain text
  // this value will be always overwritten in this scenario
  text: 'baz=abc&foo=bar&foo=baz'

  // see below
  jsonObj: false
}
```

###### application/json

- will match when `postData.mimeType` is one of: `application/json`, `text/json`, `text/x-json`, `application/x-json`
- In case of failure to parse `postData.text` as a JSON object, `postData.mimeType` is set to `text/plain`, `postData.jsonObj` remains as `false`. this is done so that the implementing target, would still attempt to post the raw body as is.
- This also emphasizes not to rely on `postData.mimeType` for the `Content-Type` header!

```js
postData: {
  // added to pass har-validator
  size: 0,

  // original value
  mimeType: 'application/json',

  // ignored
  params: [],

  // default value
  paramsObj: false

  // the raw body in plain text
  text: '"{\"foo\": \"bar\"}"'

  // the parsed value of postData.text
  jsonObj: {
    foo: 'bar'
  }
}
```

###### multipart/form-data

- will match when `postData.mimeType` is one of: `multipart/mixed` `multipart/related`, `multipart/form-data`, `multipart/alternative`
- will force `postData.mimeType` to `multipart/form-data`
- will create/overwrite the `Content-Type` header if it does not exist, with the appropriate boundary flag.
- when no `params[].value` is present, will default to empty content

```js
postData: {
  // added to pass har-validator
  size: 0,

  // original value
  mimeType: 'multipart/form-data',

  // parsed into text values
  params: [
    {
      name: 'foo',
      value: 'bar'
    }
  ]

  // ignored
  paramsObj: false

  // the raw body in plain text
  // generated based on appropriately parsing the `params` into a multi-boundary content string
  // this value will be always overwritten in this scenario
  text: '----------------------------591447866569479977899212\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n----------------------------591447866569479977899212--'

  // ignored
  jsonObj: false
}
```

###### multipart/form-data (File Uploads)

```js
postData: {
  // added to pass har-validator
  size: 0,

  // original value
  mimeType: 'multipart/form-data',

  // parsed into text values
  params: [
    {
      name: 'foo',
      value: 'Hello World',
      fileName: 'test/fixtures/files/hello.txt',
      contentType: 'text/plain'
    }
  ]

  // ignored
  paramsObj: false

  // the raw body in plain text
  // generated based on appropriately parsing the `params` into a multi-boundary content string
  // this value will be always overwritten in this scenario
  text: '----------------------------771333709043252625002993\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"hello.txt\"\r\nContent-Type: text/plain\r\n\r\nHello World\r\n----------------------------771333709043252625002993--'

  // ignored
  jsonObj: false
}
```
