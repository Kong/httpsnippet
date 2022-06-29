import { Target } from '../targets';
import { cohttp } from './cohttp/client';

export const ocaml: Target = {
  info: {
    key: 'ocaml',
    title: 'OCaml',
    extname: '.ml',
    default: 'cohttp',
  },
  clientsById: {
    cohttp,
  },
};
