import type { Target } from '../index.js';

import { restmethod } from './restmethod/client.js';
import { webrequest } from './webrequest/client.js';

export const powershell: Target = {
  info: {
    key: 'powershell',
    title: 'Powershell',
    default: 'webrequest',
  },
  clientsById: {
    webrequest,
    restmethod,
  },
};
