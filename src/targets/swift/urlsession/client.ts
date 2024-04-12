/**
 * @description
 * HTTP code snippet generator for Swift using URLSession.
 *
 * @author
 * @thibaultCha
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import type { Client } from '../../index.js';

import { CodeBuilder } from '../../../helpers/code-builder.js';
import { literalRepresentation, literalDeclaration } from '../helpers.js';

export interface UrlsessionOptions {
  pretty?: boolean;
  timeout?: number | string;
}

export const urlsession: Client<UrlsessionOptions> = {
  info: {
    key: 'urlsession',
    title: 'URLSession',
    link: 'https://developer.apple.com/documentation/foundation/urlsession',
    description: "Foundation's URLSession request",
    extname: '.swift',
  },
  convert: ({ allHeaders, postData, uriObj, queryObj, method }, options) => {
    const opts = {
      indent: '  ',
      pretty: true,
      timeout: 10,
      ...options,
    };

    const { push, blank, join } = new CodeBuilder({ indent: opts.indent });

    push('import Foundation');
    blank();

    const hasBody = postData.text || postData.jsonObj || postData.params;
    if (hasBody) {
      switch (postData.mimeType) {
        case 'application/x-www-form-urlencoded':
          // By appending parameters one by one in the resulting snippet,
          // we make it easier for the user to edit it according to his or her needs after pasting.
          // The user can just add/remove lines adding/removing body parameters.
          if (postData.params?.length) {
            const parameters = postData.params.map(p => `"${p.name}": "${p.value}"`);
            if (opts.pretty) {
              push('let parameters = [');
              parameters.forEach(param => push(`${param},`, 1));
              push(']');
            } else {
              push(`let parameters = [${parameters.join(', ')}]`);
            }

            push('let joinedParameters = parameters.map { "\\($0.key)=\\($0.value)" }.joined(separator: "&")');
            push('let postData = Data(joinedParameters.utf8)');
            blank();
          }
          break;

        case 'application/json':
          if (postData.jsonObj) {
            push(`${literalDeclaration('parameters', postData.jsonObj, opts)} as [String : Any]`);
            blank();
            push('let postData = try JSONSerialization.data(withJSONObject: parameters, options: [])');
            blank();
          }
          break;

        case 'multipart/form-data':
          /**
           * By appending multipart parameters one by one in the resulting snippet,
           * we make it easier for the user to edit it according to his or her needs after pasting.
           * The user can just edit the parameters Dictionary or put this part of a snippet in a multipart builder method.
           */

          push(literalDeclaration('parameters', postData.params, opts));
          blank();
          push(`let boundary = "${postData.boundary}"`);
          blank();
          push('var body = ""');
          push('for param in parameters {');
          push('let paramName = param["name"]!', 1);
          push('body += "--\\(boundary)\\r\\n"', 1);
          push('body += "Content-Disposition:form-data; name=\\"\\(paramName)\\""', 1);
          push('if let filename = param["fileName"] {', 1);
          push('let contentType = param["content-type"]!', 2);
          push('let fileContent = try String(contentsOfFile: filename, encoding: .utf8)', 2);
          push('body += "; filename=\\"\\(filename)\\"\\r\\n"', 2);
          push('body += "Content-Type: \\(contentType)\\r\\n\\r\\n"', 2);
          push('body += fileContent', 2);
          push('} else if let paramValue = param["value"] {', 1);
          push('body += "\\r\\n\\r\\n\\(paramValue)"', 2);
          push('}', 1);
          push('}');
          blank();
          push('let postData = Data(body.utf8)');
          blank();
          break;

        default:
          push(`let postData = Data("${postData.text}".utf8)`);
          blank();
      }
    }

    push(`let url = URL(string: "${uriObj.href}")!`);

    const queries = queryObj ? Object.entries(queryObj) : [];
    if (queries.length < 1) {
      push('var request = URLRequest(url: url)');
    } else {
      push('var components = URLComponents(url: url, resolvingAgainstBaseURL: true)!');
      push('let queryItems: [URLQueryItem] = [');

      queries.forEach(query => {
        const key = query[0];
        const value = query[1];
        switch (Object.prototype.toString.call(value)) {
          case '[object String]':
            push(`URLQueryItem(name: "${key}", value: "${value}"),`, 1);
            break;
          case '[object Array]':
            (value as string[]).forEach((val: string) => {
              push(`URLQueryItem(name: "${key}", value: "${val}"),`, 1);
            });
            break;
        }
      });
      push(']');
      push('components.queryItems = components.queryItems.map { $0 + queryItems } ?? queryItems');

      blank();
      push('var request = URLRequest(url: components.url!)');
    }

    push(`request.httpMethod = "${method}"`);
    push(`request.timeoutInterval = ${opts.timeout}`);

    if (Object.keys(allHeaders).length) {
      push(`request.allHTTPHeaderFields = ${literalRepresentation(allHeaders, opts)}`);
    }

    if (hasBody) {
      push('request.httpBody = postData');
    }

    blank();

    push('let (data, response) = try await URLSession.shared.data(for: request)');
    push('print(String(decoding: data, as: UTF8.self))');

    return join();
  },
};
