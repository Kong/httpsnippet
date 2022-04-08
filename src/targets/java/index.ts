import { Target } from '..';
import { asynchttp } from './asynchttp';
import { nethttp } from './nethttp';
import { okhttp } from './okhttp';
import { unirest } from './unirest';

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
