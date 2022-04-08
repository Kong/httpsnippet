import { Client } from '../../targets';
import { generatePowershellConvert } from '../common';

export const restmethod: Client = {
  info: {
    key: 'restmethod',
    title: 'Invoke-RestMethod',
    link: 'https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-RestMethod',
    description: 'Powershell Invoke-RestMethod client',
  },
  convert: generatePowershellConvert('Invoke-RestMethod'),
};
