import type { Target } from '../index.js';

import { requests } from './requests/client.js';

export const python: Target = {
  info: {
    key: 'python',
    title: 'Python',
    default: 'requests',
    cli: 'python3 %s',
  },
  clientsById: {
    requests,
  },
};
