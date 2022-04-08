import { getHeader, getHeaderName, hasHeader } from './headers';

const headers = {
  'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
  accept: 'application/json',
};

describe('Headers', () => {
  describe('getHeader', () => {
    it('should get a header', () => {
      expect(getHeader(headers, 'content-type')).toEqual('multipart/form-data; boundary=---011000010111000001101001');
      expect(getHeader(headers, 'content-TYPE')).toEqual('multipart/form-data; boundary=---011000010111000001101001');
      expect(getHeader(headers, 'Accept')).toEqual('application/json');
      expect(getHeader(headers, 'authorization')).toEqual(undefined);
    });
  });

  describe('getHeaderName', () => {
    it('should get a header name', () => {
      expect(getHeaderName(headers, 'content-type')).toEqual('Content-Type');
      expect(getHeaderName(headers, 'content-TYPE')).toEqual('Content-Type');
      expect(getHeaderName(headers, 'Accept')).toEqual('accept');
      expect(getHeaderName(headers, 'authorization')).toEqual(undefined);
    });
  });

  describe('hasHeader', () => {
    it('should return if a header is present', () => {
      expect(hasHeader(headers, 'content-type')).toEqual(true);
      expect(hasHeader(headers, 'content-TYPE')).toEqual(true);
      expect(hasHeader(headers, 'Accept')).toEqual(true);
      expect(hasHeader(headers, 'authorization')).toEqual(false);
    });
  });
});
