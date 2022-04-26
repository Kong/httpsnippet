import { Target } from '../targets';
import { python3 } from './python3/client';
import { requests } from './requests/client';

export const python: Target = {
  info: {
    key: 'python',
    title: 'Python',
    extname: '.py',
    default: 'python3',
  },
  clientsById: {
    python3,
    requests,
  },
};
