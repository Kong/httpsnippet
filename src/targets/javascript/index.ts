import { Target } from '..';

import { axios } from './axios';
import { fetch } from './fetch';
import { jquery } from './jquery';
import { xhr } from './xhr';

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
