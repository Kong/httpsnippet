import { Target } from '../targets';
import { curl } from './curl/client';
import { guzzle } from './guzzle/client';
import { http1 } from './http1/client';
import { http2 } from './http2/client';

export const php: Target = {
  info: {
    key: 'php',
    title: 'PHP',
    extname: '.php',
    default: 'curl',
  },
  clientsById: {
    curl,
    guzzle,
    http1,
    http2,
  },
};
