import { Target } from '../targets';
import { reqwest } from './reqwest/client';


export const rust: Target = {
  info: {
    key: 'rust',
    title: 'Rust',
    extname: '.rs',
    default: 'reqwest',
  },
  clientsById: {
    reqwest,
  },
};
