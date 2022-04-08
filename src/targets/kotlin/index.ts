import { Target } from '..';
import { okhttp } from './okhttp';

export const kotlin: Target = {
  info: {
    key: 'kotlin',
    title: 'Kotlin',
    extname: '.kt',
    default: 'okhttp',
  },
  clientsById: {
    okhttp,
  },
};
