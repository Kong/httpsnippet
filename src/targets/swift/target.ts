import type { Target } from '../index.js';

import { urlsession } from './urlsession/client.js';

export const swift: Target = {
  info: {
    key: 'swift',
    title: 'Swift',
    default: 'urlsession',
  },
  clientsById: {
    urlsession,
  },
};
