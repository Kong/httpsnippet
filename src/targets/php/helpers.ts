import { escapeString } from "../../helpers/escape";

export const convertType = (obj: any[] | any, indent?: string, lastIndent?: string) => {
  lastIndent = lastIndent || '';
  indent = indent || '';

  switch (Object.prototype.toString.call(obj)) {
    case '[object Null]':
      return 'null';

    case '[object Undefined]':
      return 'null';

    case '[object String]':
      return `'${escapeString(obj, { delimiter: "'", escapeNewlines: false })}'`;

    case '[object Number]':
      return obj.toString();

    case '[object Array]': {
      const contents = obj
        .map((item: any) => convertType(item, `${indent}${indent}`, indent))
        .join(`,\n${indent}`);
      return `[\n${indent}${contents}\n${lastIndent}]`;
    }

    case '[object Object]': {
      const result: string[] = [];
      for (const i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i)) {
          result.push(
            `${convertType(i, indent)} => ${convertType(obj[i], `${indent}${indent}`, indent)}`,
          );
        }
      }
      return `[\n${indent}${result.join(`,\n${indent}`)}\n${lastIndent}]`;
    }

    default:
      return 'null';
  }
};

export const supportedMethods = [
  'ACL',
  'BASELINE_CONTROL',
  'CHECKIN',
  'CHECKOUT',
  'CONNECT',
  'COPY',
  'DELETE',
  'GET',
  'HEAD',
  'LABEL',
  'LOCK',
  'MERGE',
  'MKACTIVITY',
  'MKCOL',
  'MKWORKSPACE',
  'MOVE',
  'OPTIONS',
  'POST',
  'PROPFIND',
  'PROPPATCH',
  'PUT',
  'REPORT',
  'TRACE',
  'UNCHECKOUT',
  'UNLOCK',
  'UPDATE',
  'VERSION_CONTROL',
];
