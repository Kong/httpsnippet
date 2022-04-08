import { Target } from '../targets';
import { native } from './native/client';
import { request } from './request/client';
import { unirest } from './unirest/client';
import { axios } from './axios/client';
import { fetch } from './fetch/client';

export const node: Target = {
  info: {
    key: 'node',
    title: 'Node.js',
    extname: '.js',
    default: 'native',
  },
  clientsById: {
    native,
    request,
    unirest,
    axios,
    fetch,
  },
};
