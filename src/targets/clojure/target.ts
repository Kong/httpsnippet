import type { Target } from '../index.js';

import { clj_http } from './clj_http/client.js';

export const clojure: Target = {
  info: {
    key: 'clojure',
    title: 'Clojure',
    default: 'clj_http',
  },
  clientsById: {
    clj_http,
  },
};
