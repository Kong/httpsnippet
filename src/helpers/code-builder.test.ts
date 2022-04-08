import { CodeBuilder } from './code-builder';

describe('CodeBuilder', () => {
  describe('indentLine', () => {
    const indent = '\t';
    const builder = new CodeBuilder({ indent });
    const line = 'console.log("hello world")';
    it('handles a single argument', () => {
      const result = builder.indentLine(line);
      expect(result).toEqual(line);
    });

    it('handels indentation', () => {
      const result = builder.indentLine(line, 2);
      expect(result).toEqual(`${indent.repeat(2)}${line}`);
    });
  });
});
