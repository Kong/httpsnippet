type Headers = Record<string, string>;

/**
 * Given a headers object retrieve a specific header out of it via a case-insensitive key.
 */
export const getHeaderName = (headers: Headers, name: string) => Object.keys(headers).find(header => header.toLowerCase() === name.toLowerCase());

/**
 * Given a headers object retrieve the contents of a header out of it via a case-insensitive key.
 */
export const getHeader = (headers: Headers, name: string) => headers[getHeaderName(headers, name)];

/**
 * Determine if a given case-insensitive header exists within a header object.
 */
export const hasHeader = (headers: Headers, name: string) => Boolean(getHeaderName(headers, name));
