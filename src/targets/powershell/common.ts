import { CodeBuilder } from '../../helpers/code-builder';
import { escapeString } from '../../helpers/escape';
import { getHeader } from '../../helpers/headers';
import { Converter } from '../targets';

export type PowershellCommand = 'Invoke-RestMethod' | 'Invoke-WebRequest';

export const generatePowershellConvert = (command: PowershellCommand) => {
  const convert: Converter<any> = ({
    method,
    headersObj,
    cookies,
    uriObj,
    fullUrl,
    postData,
    allHeaders,
  }) => {
    const { push, join } = new CodeBuilder();
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

    if (!methods.includes(method.toUpperCase())) {
      return 'Method not supported';
    }

    const commandOptions = [];

    // Add headers, including the cookies
    const headers = Object.keys(headersObj);

    // construct headers
    if (headers.length) {
      push('$headers=@{}');
      headers.forEach(key => {
        if (key !== 'connection') {
          // Not allowed
          push(`$headers.Add("${key}", "${escapeString(headersObj[key], { escapeChar: '`' })}")`);
        }
      });
      commandOptions.push('-Headers $headers');
    }

    // construct cookies
    if (cookies.length) {
      push('$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession');

      cookies.forEach(cookie => {
        push('$cookie = New-Object System.Net.Cookie');

        push(`$cookie.Name = '${cookie.name}'`);
        push(`$cookie.Value = '${cookie.value}'`);
        push(`$cookie.Domain = '${uriObj.host}'`);

        push('$session.Cookies.Add($cookie)');
      });
      commandOptions.push('-WebSession $session');
    }

    if (postData.text) {
      commandOptions.push(`-ContentType '${
        escapeString(getHeader(allHeaders, 'content-type'), { delimiter: "'", escapeChar: '`' })
      }'`);
      commandOptions.push(`-Body '${postData.text}'`);
    }

    push(`$response = ${command} -Uri '${fullUrl}' -Method ${method} ${commandOptions.join(' ')}`);
    return join();
  };
  return convert;
};
