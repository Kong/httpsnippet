import { escapeString } from './escape';

describe('Escape methods', () => {
  describe('escapeString', () => {
    it('does nothing to a safe string', () => {
      expect(
        escapeString("hello world")
      ).toBe("hello world");
    });

    it('escapes double quotes by default', () => {
      expect(
        escapeString('"hello world"')
      ).toBe('\\"hello world\\"');
    });

    it('escapes newlines by default', () => {
      expect(
        escapeString('hello\r\nworld')
      ).toBe('hello\\r\\nworld');
    });

    it('escapes backslashes', () => {
      expect(
        escapeString('hello\\world')
      ).toBe('hello\\\\world');
    });

    it('escapes unrepresentable characters', () => {
      expect(
        escapeString('hello \u0000') // 0 = ASCII 'null' character
      ).toBe('hello \\u0000');
    });
  });
});
