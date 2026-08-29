import { CodeBuilder } from '../../../helpers/code-builder';
import { escapeForDoubleQuotes } from '../../../helpers/escape';
import { Client } from '../../targets';

export const sttp: Client = {
  info: {
    key: 'sttp',
    title: 'sttp',
    link: 'https://sttp.softwaremill.com/',
    description: 'The Scala HTTP Client API you always wanted',
  },
  convert: ({ allHeaders, method, fullUrl, headersObj, cookies, postData }) => {
    const { push, join } = new CodeBuilder();
    const formattedMethod = method.toLowerCase();
    const supportedMethods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'];

    if (!supportedMethods.includes(formattedMethod)) {
      return 'Method not supported';
    }

    push('import sttp.client4.*');
    push('');
    push('val backend = DefaultSyncBackend()');

    let requestChain = `basicRequest.${formattedMethod}(uri"${fullUrl}")`;

    // Add headers
    Object.keys(headersObj).forEach(key => {
      const escapedVal = escapeForDoubleQuotes(headersObj[key]);
      requestChain += `\n  .header("${escapeForDoubleQuotes(key)}", "${escapedVal}")`;
    });

    // Add cookies (sttp has native .cookie support)
    cookies.forEach(({ name, value }) => {
      requestChain += `\n  .cookie("${escapeForDoubleQuotes(name)}", "${escapeForDoubleQuotes(value)}")`;
    });

    // Add request body
    if (postData && postData.text) {
      const escapedBody = escapeForDoubleQuotes(postData.text);
      requestChain += `\n  .body("${escapedBody}")`;
    }

    push(`val response = ${requestChain}`);
    push('  .send(backend)');
    push('');

    return join();
  },
};