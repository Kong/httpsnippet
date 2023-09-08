import type { Target } from '..';

import { clj_http } from './clj_http/client';

export const clojure: Target = {
  info: {
    key: 'clojure',
    title: 'Clojure',
    extname: '.clj',
    default: 'clj_http',
  },
  clientsById: {
    clj_http,
  },
};
