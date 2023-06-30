import type { Target } from '../targets';

import { native } from './native/client';

export const json: Target = {
  info: {
    key: 'json',
    title: 'JSON',
    extname: '.json',
    default: 'native',
  },
  clientsById: {
    native,
  },
};
