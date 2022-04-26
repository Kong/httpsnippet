import { request } from '../targets/node/request/client';
import { Target } from '../targets/targets';

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
