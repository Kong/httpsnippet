import type { Target } from '../targets.js';
import { libcurl } from './libcurl/client.js';

export const c: Target = {
  info: {
    key: 'c',
    title: 'C',
    extname: '.c',
    default: 'libcurl',
  },
  clientsById: {
    libcurl,
  },
};
