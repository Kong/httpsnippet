import type { Target } from '../targets/index.js';

import { request } from '../targets/node/request/client.js';

export const customTarget = {
  info: {
    key: 'js-variant',
    title: 'JavaScript Variant',
    extname: '.js',
    default: 'request',
  },
  clientsById: {
    request,
  },
} as unknown as Target;
