import { Target } from '../targets';
import { asynchttp } from './asynchttp/client';
import { nethttp } from './nethttp/client';
import { okhttp } from './okhttp/client';
import { unirest } from './unirest/client';

export const java: Target = {
  info: {
    key: 'java',
    title: 'Java',
    extname: '.java',
    default: 'unirest',
  },

  clientsById: {
    asynchttp,
    nethttp,
    okhttp,
    unirest,
  },
};
