import { Target } from '../targets';
import { axios } from './axios/client';
import { fetch } from './fetch/client';
import { jquery } from './jquery/client';
import { xhr } from './xhr/client';

export const javascript: Target = {
  info: {
    key: 'javascript',
    title: 'JavaScript',
    extname: '.js',
    default: 'xhr',
  },

  clientsById: {
    xhr,
    axios,
    fetch,
    jquery,
  },
};
