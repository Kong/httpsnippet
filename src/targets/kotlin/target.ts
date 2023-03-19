import type { Target } from '../targets.js';
import { okhttp } from './okhttp/client.js';

export const kotlin: Target = {
  info: {
    key: 'kotlin',
    title: 'Kotlin',
    extname: '.kt',
    default: 'okhttp',
  },
  clientsById: {
    okhttp,
  },
};
