import { Target } from '../targets';
import { httr } from './httr/client';

export const r: Target = {
  info: {
    key: 'r',
    title: 'R',
    extname: '.r',
    default: 'httr',
  },
  clientsById: {
    httr,
  },
};
