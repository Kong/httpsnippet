import type { Target } from '../index.js';

import { native } from './native/client.js';

export const json: Target = {
  info: {
    key: 'json',
    title: 'JSON',
    default: 'native',
  },
  clientsById: {
    native,
  },
};
