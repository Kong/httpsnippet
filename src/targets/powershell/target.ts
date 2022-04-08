import { Target } from '../targets';
import { webrequest } from './webrequest/client';
import { restmethod } from './restmethod/client';

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
