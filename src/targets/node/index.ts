import { Target } from '..';
import { native } from './native';
import { request } from './request';
import { unirest } from './unirest';
import { axios } from './axios';
import { fetch } from './fetch';

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
