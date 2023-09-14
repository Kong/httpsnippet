import type { Target } from '../index.js';

import { httr } from './httr/client.js';

export const r: Target = {
  info: {
    key: 'r',
    title: 'R',
    default: 'httr',
  },
  clientsById: {
    httr,
  },
};
