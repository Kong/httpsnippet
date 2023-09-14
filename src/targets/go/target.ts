import type { Target } from '../index.js';

import { native } from './native/client.js';

export const go: Target = {
  info: {
    key: 'go',
    title: 'Go',
    default: 'native',
    cli: 'go',
  },
  clientsById: {
    native,
  },
};
