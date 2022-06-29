import { availableTargets, extname } from './utils';

describe('availableTargets', () => {
  it('returns all available targets', () => {
    expect(availableTargets()).toMatchSnapshot();
  });
});

describe('extname', () => {
  it('returns the correct extension', () => {
    expect(extname('c')).toBe('.c');
    expect(extname('clojure')).toBe('.clj');
  });

  it('returns empty string if the extension is not found', () => {
    // @ts-expect-error intentionally incorrect
    expect(extname('ziltoid')).toBe('');
  });
});
