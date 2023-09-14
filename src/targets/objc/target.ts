import type { Target } from '../index.js';

import { nsurlsession } from './nsurlsession/client.js';

export const objc: Target = {
  info: {
    key: 'objc',
    title: 'Objective-C',
    default: 'nsurlsession',
  },
  clientsById: {
    nsurlsession,
  },
};
