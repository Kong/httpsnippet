/**
 * @license https://raw.githubusercontent.com/node-fetch/node-fetch/master/LICENSE.md
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 - 2020 Node Fetch Team
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Extracted from https://github.com/node-fetch/node-fetch/blob/64c5c296a0250b852010746c76144cb9e14698d9/src/utils/form-data.js
 */

import type FormData from 'form-data';

const carriage = '\r\n';
const dashes = '-'.repeat(2);

const NAME = Symbol.toStringTag;

export const isBlob = (object: any) =>
  typeof object === 'object' &&
  typeof object.arrayBuffer === 'function' &&
  typeof object.type === 'string' &&
  typeof object.stream === 'function' &&
  typeof object.constructor === 'function' &&
  /^(Blob|File)$/.test(object[NAME]);

const getFooter = (boundary: string) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;

const getHeader = (boundary: string, name: string, field: { name: string; type: string }) => {
  let header = '';

  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;

  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || 'application/octet-stream'}`;
  }

  return `${header}${carriage.repeat(2)}`;
};

export const formDataIterator = function* (form: FormData, boundary: string) {
  // @ts-expect-error not sure how this ever worked
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);

    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }

    yield carriage;
  }

  yield getFooter(boundary);
};
