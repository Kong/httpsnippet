import { Target } from '../targets';
import { okhttp } from './okhttp/client';

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
