import { CodeBuilder } from './code-builder';

describe('CodeBuilder', () => {
  describe('buildLine', () => {
    const builder = new CodeBuilder('\t');
    it('handles a single argument', () => {
      const output = 'console.log("hello world")';
      const result = builder.buildLine(output);
      expect(result).toEqual(output);
    });

    it('handels indentation', () => {
      const output = 'console.log("hello world")';
      const result = builder.buildLine(output, 2);
      expect(result).toEqual('console.log("\t\thello world")');
    });
  })
})
