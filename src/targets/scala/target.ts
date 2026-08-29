import { Target } from '../targets';
import { sttp } from './sttp/client';

export const scala: Target = {
  info: {
    key: 'scala',
    title: 'Scala',
    extname: '.scala',
    default: 'sttp',
  },
  clientsById: {
    sttp,
  },
};