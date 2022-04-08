import { removeQuotes } from './helpers';

describe('removeQuotes', () => {
  it('removes quotes to something matching the regex', () => {
    const sourceCode = `foo: 'foo',`;
    expect(removeQuotes(['foo'])(sourceCode)).toEqual('foo: foo');
  });
});
