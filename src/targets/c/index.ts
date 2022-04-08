import { Target } from "..";
import { libcurl } from './libcurl';

export const c: Target = {
  info: {
    key: 'c',
    title: 'C',
    extname: '.c',
    default: 'libcurl',
  },
  clientsById: {
    libcurl,
  },
};
