import type { Target } from '../targets.js';
import { native } from './native/client.js';

export const go: Target = {
  info: {
    key: 'go',
    title: 'Go',
    extname: '.go',
    default: 'native',
  },
  clientsById: {
    native,
  },
};
