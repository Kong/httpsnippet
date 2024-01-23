import { Target } from '../targets';
import { native } from './native/client';
import { faraday } from './faraday/client';

export const ruby: Target = {
  info: {
    key: 'ruby',
    title: 'Ruby',
    extname: '.rb',
    default: 'native',
  },
  clientsById: {
    native,
    faraday
  },
};
