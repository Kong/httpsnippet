import type { Target } from '..';

import { libcurl } from './libcurl/client';

export const c: Target = {
  info: {
    key: 'c',
    title: 'C',
    extname: '.c',
    default: 'libcurl',
    cli: 'c',
  },
  clientsById: {
    libcurl,
  },
};
