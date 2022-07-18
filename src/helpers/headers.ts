import { ValueOf } from 'type-fest';

type Headers<T> = Record<string, T>;

/**
 * Given a headers object retrieve a specific header out of it via a case-insensitive key.
 */
export const getHeaderName = <T>(headers: Headers<T>, name: string) =>
  Object.keys(headers).find(header => header.toLowerCase() === name.toLowerCase());

/**
 * Given a headers object retrieve the contents of a header out of it via a case-insensitive key.
 */
export const getHeader = <T>(headers: Headers<T>, name: string) => {
  const headerName = getHeaderName(headers, name);
  if (!headerName) {
    return undefined;
  }
  return headers[headerName];
};

/**
 * Determine if a given case-insensitive header exists within a header object.
 */
export const hasHeader = <T>(headers: Headers<T>, name: string) =>
  Boolean(getHeaderName(headers, name));

const mimeTypeJson = [
  'application/json',
  'application/x-json',
  'text/json',
  'text/x-json',
  '+json',
] as const;

type MimeTypeJson = `${string}${typeof mimeTypeJson[number]}${string}`;

/**
 * Determines if a given mimetype is JSON, or a variant of such.
 */
export const isMimeTypeJSON = (mimeType: string): mimeType is MimeTypeJson =>
  mimeTypeJson.some(type => mimeType.includes(type));
