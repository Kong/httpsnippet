import { getHeader, getHeaderName, hasHeader } from './headers';

const headers = {
  'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
  accept: 'application/json',
};

describe('headers', () => {
  describe('getHeader', () => {
    it('should get a header', () => {
      expect(getHeader(headers, 'content-type')).toBe(
        'multipart/form-data; boundary=---011000010111000001101001',
      );
      expect(getHeader(headers, 'content-TYPE')).toBe(
        'multipart/form-data; boundary=---011000010111000001101001',
      );
      expect(getHeader(headers, 'Accept')).toBe('application/json');
      expect(getHeader(headers, 'authorization')).toBeUndefined();
    });
  });

  describe('getHeaderName', () => {
    it('should get a header name', () => {
      expect(getHeaderName(headers, 'content-type')).toBe('Content-Type');
      expect(getHeaderName(headers, 'content-TYPE')).toBe('Content-Type');
      expect(getHeaderName(headers, 'Accept')).toBe('accept');
      expect(getHeaderName(headers, 'authorization')).toBeUndefined();
    });
  });

  describe('hasHeader', () => {
    it('should return if a header is present', () => {
      expect(hasHeader(headers, 'content-type')).toBe(true);
      expect(hasHeader(headers, 'content-TYPE')).toBe(true);
      expect(hasHeader(headers, 'Accept')).toBe(true);
      expect(hasHeader(headers, 'authorization')).toBe(false);
    });
  });
});
