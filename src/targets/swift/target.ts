import { Target } from '..';
import { nsurlsession } from './nsurlsession/client';

export const swift: Target = {
  info: {
    key: 'swift',
    title: 'Swift',
    extname: '.swift',
    default: 'nsurlsession',
  },
  clientsById: {
    nsurlsession,
  },
};
