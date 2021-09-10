module.exports = {
  /**
   * Given a headers object retrieve the contents of a header out of it via a case-insensitive key.
   *
   * @param {object} headers
   * @param {string} name
   * @return {string}
   */
  getHeader: (headers, name) => {
    return headers[Object.keys(headers).find(k => k.toLowerCase() === name.toLowerCase())];
  },

  /**
   * Given a headers object retrieve a specific header out of it via a case-insensitive key.
   *
   * @param {object} headers
   * @param {string} name
   * @return {string}
   */
  getHeaderName: (headers, name) => {
    return Object.keys(headers).find(k => {
      return k.toLowerCase() === name.toLowerCase();
    });
  },

  /**
   * Determine if a given case-insensitive header exists within a header object.
   *
   * @param {object} headers
   * @param {string} name
   * @return {(integer|boolean)}
   */
  hasHeader: (headers, name) => {
    return Boolean(Object.keys(headers).find(k => k.toLowerCase() === name.toLowerCase()));
  },

  /**
   * Determines if a given mimetype is JSON, or a variant of such.
   *
   * @param {string}} mimeType
   * @returns {boolean}
   */
  isMimeTypeJson: mimeType => {
    return ['application/json', 'application/x-json', 'text/json', 'text/x-json', '+json'].some(function (type) {
      return mimeType.indexOf(type) > -1;
    });
  },
};
