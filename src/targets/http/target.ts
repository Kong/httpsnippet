import type { Target } from '../index.js';

import { http11 } from './http1.1/client.js';

export const http: Target = {
  info: {
    key: 'http',
    title: 'HTTP',
    default: 'http1.1',
  },
  clientsById: {
    'http1.1': http11,
  },
};
