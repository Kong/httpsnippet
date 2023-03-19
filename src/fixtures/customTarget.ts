import { request } from '../targets/node/request/client.js';
import type { Target } from '../targets/targets.js';

export const customTarget = {
  info: {
    key: 'js-variant',
    title: 'JavaScript Variant',
    extname: '.js',
    default: 'request',
  },
  clientsById: {
    request,
  },
} as unknown as Target;
