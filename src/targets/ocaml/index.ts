import { Target } from '..';
import { cohttp } from './cohttp';

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
