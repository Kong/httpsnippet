import type { Target } from '../targets.js';
import { restmethod } from './restmethod/client.js';
import { webrequest } from './webrequest/client.js';

export const powershell: Target = {
  info: {
    key: 'powershell',
    title: 'Powershell',
    extname: '.ps1',
    default: 'webrequest',
  },
  clientsById: {
    webrequest,
    restmethod,
  },
};
