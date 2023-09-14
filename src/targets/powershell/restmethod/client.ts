import type { Client } from '../../index.js';

import { generatePowershellConvert } from '../common.js';

export const restmethod: Client = {
  info: {
    key: 'restmethod',
    title: 'Invoke-RestMethod',
    link: 'https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-RestMethod',
    description: 'Powershell Invoke-RestMethod client',
    extname: '.ps1',
  },
  convert: generatePowershellConvert('Invoke-RestMethod'),
};
