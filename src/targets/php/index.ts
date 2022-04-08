import { Target } from '..';
import { curl } from './curl';
import { http1 } from './http1';
import { http2 } from './http2';

export const php: Target = {
  info: {
    key: 'php',
    title: 'PHP',
    extname: '.php',
    default: 'curl',
  },
  clientsById: {
    curl,
    http1,
    http2,
  },
};
