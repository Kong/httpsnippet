import type { Target } from '../targets.js';
import { nsurlsession } from './nsurlsession/client.js';

export const swift: Target = {
  info: {
    key: 'swift',
    title: 'Swift',
    extname: '.swift',
    default: 'nsurlsession',
  },
  clientsById: {
    nsurlsession,
  },
};
