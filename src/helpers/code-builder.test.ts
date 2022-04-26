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
});
