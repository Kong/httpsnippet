import type { Target } from '../targets.js';
import { cohttp } from './cohttp/client.js';

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
