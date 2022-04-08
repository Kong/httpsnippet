import { Target } from '../targets';
import { restmethod } from './restmethod/client';
import { webrequest } from './webrequest/client';

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
