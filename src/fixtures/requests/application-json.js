module.exports = {
  log: {
    version: '1.2',
    creator: {
      name: 'HTTPSnippet',
      version: '1.0.0',
    },
    entries: [
      {
        request: {
          method: 'POST',
          url: 'https://httpbin.org/anything',
          headers: [
            {
              name: 'content-type',
              value: 'application/json',
            },
          ],
          postData: {
            mimeType: 'application/json',
            text: '{"number":1,"string":"f\\"oo","arr":[1,2,3],"nested":{"a":"b"},"arr_mix":[1,"a",{"arr_mix_nested":[]}],"boolean":false}',
          },
        },
        response: {
          status: 200,
          statusText: 'OK',
          httpVersion: 'HTTP/1.1',
          headers: [
            {
              name: 'Content-Type',
              value: 'application/json',
            },
          ],
          content: {
            size: -1,
            mimeType: 'application/json',
            text: JSON.stringify({
              args: {},
              data: '{\n  "number": 1,\n  "string": "f\\"oo",\n  "arr": [\n    1,\n    2,\n    3\n  ],\n  "nested": {\n    "a": "b"\n  },\n  "arr_mix": [\n    1,\n    "a",\n    {\n      "arr_mix_nested": []\n    }\n  ],\n  "boolean": false\n}',
              files: {},
              form: {},
              headers: {
                'Content-Type': 'application/json',
              },
              json: {
                arr: [1, 2, 3],
                arr_mix: [
                  1,
                  'a',
                  {
                    arr_mix_nested: [],
                  },
                ],
                boolean: false,
                nested: {
                  a: 'b',
                },
                number: 1,
                string: 'f"oo',
              },
              method: 'POST',
              url: 'https://httpbin.org/anything',
            }),
          },
          headersSize: -1,
          bodySize: -1,
        },
      },
    ],
  },
};
