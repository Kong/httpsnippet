import type { Target } from '../index.js';

import { asynchttp } from './asynchttp/client.js';
import { nethttp } from './nethttp/client.js';
import { okhttp } from './okhttp/client.js';
import { unirest } from './unirest/client.js';

export const java: Target = {
  info: {
    key: 'java',
    title: 'Java',
    default: 'unirest',
  },

  clientsById: {
    asynchttp,
    nethttp,
    okhttp,
    unirest,
  },
};
