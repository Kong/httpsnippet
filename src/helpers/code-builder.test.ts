import { CodeBuilder } from './code-builder';

describe('codeBuilder', () => {
  describe('indentLine', () => {
    const indent = '\t';
    const builder = new CodeBuilder({ indent });
    const line = 'console.log("hello world")';

    it('handles a single argument', () => {
      const result = builder.indentLine(line);

      expect(result).toStrictEqual(line);
    });

    it('handels indentation', () => {
      const result = builder.indentLine(line, 2);

      expect(result).toBe(`${indent.repeat(2)}${line}`);
    });
  });

  describe('addPostProcessor', () => {
    it('replaces accordingly with one replacer', () => {
      const indent = '\t';
      const { join, addPostProcessor, push } = new CodeBuilder({ indent });
      push('console.log("hello world")');
      addPostProcessor(code => code.replace(/console/, 'REPLACED'));

      expect(join()).toBe('REPLACED.log("hello world")');
    });

    it('replaces accordingly with multiple replacers', () => {
      const indent = '\t';
      const { join, addPostProcessor, push } = new CodeBuilder({ indent });
      push('console.log("hello world")');
      addPostProcessor(code => code.replace(/world/, 'nurse!!'));
      addPostProcessor(code => code.toUpperCase());

      expect(join()).toBe('CONSOLE.LOG("HELLO NURSE!!")');
    });
  });
});
