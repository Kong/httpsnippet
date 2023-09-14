import type { Target } from '../index.js';

import { httpclient } from './httpclient/client.js';
import { restsharp } from './restsharp/client.js';

export const csharp: Target = {
  info: {
    key: 'csharp',
    title: 'C#',
    default: 'restsharp',
    cli: 'dotnet',
  },

  clientsById: {
    httpclient,
    restsharp,
  },
};
