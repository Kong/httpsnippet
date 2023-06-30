/**
 * @description
 * HTTP code snippet generator to generate raw JSON payload objects.
 *
 * @author
 * @erunion
 *
 * For any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import type { ReducedHelperObject } from '../../../helpers/reducer';
import type { Client } from '../../targets';

export const native: Client = {
  info: {
    key: 'native',
    title: 'Native JSON',
    link: 'https://www.json.org/json-en.html',
    description: 'A JSON represetation of any HAR payload.',
  },
  convert: ({ postData }, inputOpts) => {
    const opts = {
      indent: '  ',
      ...inputOpts,
    };

    let payload: string | ReducedHelperObject | undefined = '';

    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        payload = postData.paramsObj ? postData.paramsObj : postData.text;
        break;

      case 'application/json':
        if (postData.jsonObj) {
          payload = postData.jsonObj;
        }
        break;

      case 'multipart/form-data':
        if (!postData.params) {
          break;
        }

        // eslint-disable-next-line no-case-declarations
        const multipartPayload: Record<string, any> = {};
        postData.params.forEach(param => {
          multipartPayload[param.name] = param.value;
        });

        payload = multipartPayload;
        break;

      default:
        if (postData.text) {
          payload = postData.text;
        }
    }

    if (typeof payload === undefined || payload === '') {
      return '';
    }

    return JSON.stringify(payload, null, opts.indent);
  },
};
