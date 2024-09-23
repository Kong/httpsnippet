import type { Target } from '../targets/index.js';

import { axios } from '../targets/node/axios/client.js';

export const customTarget = {
  info: {
    key: 'node-variant',
    title: 'Node Variant',
    extname: '.js',
    default: 'axios',
  },
  clientsById: {
    axios,
  },
} as unknown as Target;
