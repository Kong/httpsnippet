const helpers = require('../src/helpers/headers');

const headers = {
  'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
  accept: 'application/json',
};

describe('Headers', () => {
  describe('#getHeader', () => {
    it('should get a header', () => {
      expect(helpers.getHeader(headers, 'content-type')).toStrictEqual(
        'multipart/form-data; boundary=---011000010111000001101001'
      );

      expect(helpers.getHeader(headers, 'content-TYPE')).toStrictEqual(
        'multipart/form-data; boundary=---011000010111000001101001'
      );

      expect(helpers.getHeader(headers, 'Accept')).toStrictEqual('application/json');

      expect(helpers.getHeader(headers, 'authorization')).toBeUndefined();
    });
  });

  describe('#getHeaderName', () => {
    it('should get a header name', () => {
      expect(helpers.getHeaderName(headers, 'content-type')).toStrictEqual('Content-Type');
      expect(helpers.getHeaderName(headers, 'content-TYPE')).toStrictEqual('Content-Type');
      expect(helpers.getHeaderName(headers, 'Accept')).toStrictEqual('accept');

      expect(helpers.getHeaderName(headers, 'authorization')).toBeUndefined();
    });
  });

  describe('#hasHeader', () => {
    it('should return if a header is present', () => {
      expect(helpers.hasHeader(headers, 'content-type')).toBe(true);
      expect(helpers.hasHeader(headers, 'content-TYPE')).toBe(true);
      expect(helpers.hasHeader(headers, 'Accept')).toBe(true);

      expect(helpers.hasHeader(headers, 'authorization')).toBe(false);
    });
  });
});
