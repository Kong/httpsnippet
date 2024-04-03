import { Target } from '../targets';
import { native } from './native/client';

export const crystal: Target = {
  info: {
    key: 'crystal',
    title: 'Crystal',
    extname: '.cr',
    default: 'native',
  },
  clientsById: {
    native,
  },
};
