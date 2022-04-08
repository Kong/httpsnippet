import { Target } from ".."
import { httpclient } from './httpclient';

export const csharp: Target = {
  info: {
    key: 'csharp',
    title: 'C#',
    extname: '.cs',
    default: 'restsharp',
  },

  clientsById: {
    httpclient,
    // restsharp,
  }
};
