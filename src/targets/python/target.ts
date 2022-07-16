import type { Target } from '../targets';
import { requests } from './requests/client';

export const python: Target = {
  info: {
    key: 'python',
    title: 'Python',
    extname: '.py',
    default: 'requests',
    cli: 'python3 %s',
  },
  clientsById: {
    requests,
  },
};
