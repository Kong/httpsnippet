import type { Target } from '../targets.js';
import { httr } from './httr/client.js';

export const r: Target = {
  info: {
    key: 'r',
    title: 'R',
    extname: '.r',
    default: 'httr',
  },
  clientsById: {
    httr,
  },
};
