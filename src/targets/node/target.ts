import type { Target } from '../index.js';

import { axios } from './axios/client.js';
import { fetch } from './fetch/client.js';
import { native } from './native/client.js';
import { request } from './request/client.js';
import { unirest } from './unirest/client.js';

export const node: Target = {
  info: {
    key: 'node',
    title: 'Node.js',
    default: 'native',
    cli: 'node %s',
  },
  clientsById: {
    native,
    request,
    unirest,
    axios,
    fetch,
  },
};
