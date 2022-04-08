import { Target } from ".."
import { httpclient } from './httpclient';
import { restsharp } from './restsharp';

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
  }
};
