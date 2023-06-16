import { CodeBuilder } from '../../../helpers/code-builder';
import { escapeForDoubleQuotes } from '../../../helpers/escape';
import { getHeader } from '../../../helpers/headers';
import { Client } from '../../targets';

function title(s: string): string {
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

export const restsharp: Client = {
  info: {
    key: 'restsharp',
    title: 'RestSharp',
    link: 'http://restsharp.org/',
    description: 'Simple REST and HTTP API Client for .NET',
  },
  convert: ({ allHeaders, method, fullUrl, headersObj, cookies, postData, uriObj }) => {
    const { push, join } = new CodeBuilder();
    const isSupportedMethod = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(
      method.toUpperCase(),
    );

    if (!isSupportedMethod) {
      return 'Method not supported';
    }

    push(`var options = new RestClientOptions("${fullUrl}");`);
    push(`var client = new RestClient(options);`);

    // The first argument is the sub-path to the base URL, given as the
    // constructor to RestClient; for our purposes we're just giving the entire
    // URL as the base path so it can be an empty string
    push(`var request = new RestRequest("");`);

    // Add headers, including the cookies
    Object.keys(headersObj).forEach(key => {
      push(`request.AddHeader("${key}", "${escapeForDoubleQuotes(headersObj[key])}");`);
    });

    cookies.forEach(({ name, value }) => {
      push(`request.AddCookie("${name}", "${value}", "${uriObj.pathname}", "${uriObj.host}");`);
    });

    // here we're just assuming that the text is a JSON post, and that content
    // type is application/json. Improvements welcome to support multipart or
    // form-urlencoded
    if (postData.text) {
      const text = JSON.stringify(postData.text);
      push(`request.AddJsonBody(${text}, false);`);
    }

    push(`var response = await client.${title(method)}Async(request);`);
    return join();
  },
};
