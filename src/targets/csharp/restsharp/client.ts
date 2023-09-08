import type { Client } from '../../targets';

import { CodeBuilder } from '../../../helpers/code-builder';
import { escapeForDoubleQuotes } from '../../../helpers/escape';

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
  convert: ({ method, fullUrl, headersObj, cookies, postData, uriObj }) => {
    const { push, join } = new CodeBuilder();
    const isSupportedMethod = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(
      method.toUpperCase(),
    );

    if (!isSupportedMethod) {
      return 'Method not supported';
    }

    push('using RestSharp;\n\n');
    push(`var options = new RestClientOptions("${fullUrl}");`);
    push('var client = new RestClient(options);');

    // The first argument is the sub-path to the base URL, given as the
    // constructor to RestClient; for our purposes we're just giving the entire
    // URL as the base path so it can be an empty string
    push('var request = new RestRequest("");');

    // If we have multipart form data, set this value. Setting the content-type header manually and then trying to add a mutlipart file parameter
    const isMultipart = postData.mimeType && postData.mimeType === 'multipart/form-data';
    if (isMultipart) {
      push('request.AlwaysMultipartFormData = true;');
    }

    // Add headers, including the cookies
    Object.keys(headersObj).forEach(key => {
      // if we have post data, restsharp really wants to set the contentType
      // itself; do not add a content-type header or you end up with failures
      // which manifest as unhandled exceptions.
      //
      // The only case where we _do_ want to add it is if there's no postData
      // text, in which case there will be no `AddJsonBody` call, and restsharp
      // won't know to set the content type
      if (postData.mimeType && key.toLowerCase() === 'content-type' && postData.text) {
        if (isMultipart && postData.boundary) {
          push(`request.FormBoundary = "${postData.boundary}";`);
        }
        return;
      }
      push(`request.AddHeader("${key}", "${escapeForDoubleQuotes(headersObj[key])}");`);
    });

    cookies.forEach(({ name, value }) => {
      push(`request.AddCookie("${name}", "${escapeForDoubleQuotes(value)}", "${uriObj.pathname}", "${uriObj.host}");`);
    });

    switch (postData.mimeType) {
      case 'multipart/form-data':
        if (!postData.params) break;
        postData.params.forEach(param => {
          if (param.fileName) {
            push(`request.AddFile("${param.name}", "${param.fileName}");`);
          } else {
            push(`request.AddParameter("${param.name}", "${param.value}");`);
          }
        });
        break;
      case 'application/x-www-form-urlencoded':
        if (!postData.params) break;
        postData.params.forEach(param => {
          push(`request.AddParameter("${param.name}", "${param.value}");`);
        });
        break;
      case 'application/json': {
        if (!postData.text) break;
        const text = JSON.stringify(postData.text);
        push(`request.AddJsonBody(${text}, false);`);
        break;
      }
      default:
        if (!postData.text) break;
        push(`request.AddStringBody("${postData.text}", "${postData.mimeType}");`);
    }

    push(`var response = await client.${title(method)}Async(request);\n`);

    push('Console.WriteLine("{0}", response.Content);\n');

    return join();
  },
};
