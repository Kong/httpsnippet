import type { Target } from '../index.js';

import { axios } from './axios/client.js';
import { fetch } from './fetch/client.js';
import { native } from './native/client.js';

export const node: Target = {
  info: {
    key: 'node',
    title: 'Node.js',
    default: 'fetch',
    cli: 'node %s',
  },
  clientsById: {
    native,
    axios,
    fetch,
  },
};
