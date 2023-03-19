import type { Target } from '../targets.js';
import { httpclient } from './httpclient/client.js';
import { restsharp } from './restsharp/client.js';

export const csharp: Target = {
  info: {
    key: 'csharp',
    title: 'C#',
    extname: '.cs',
    default: 'restsharp',
  },

  clientsById: {
    httpclient,
    restsharp,
  },
};
