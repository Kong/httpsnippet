import expectedAvailableTargets from './fixtures/available-targets.json';
import { availableTargets, extname } from './utils';

describe('availableTargets', () => {
  it('returns all available targets', () => {
    expect(availableTargets()).toEqual(expectedAvailableTargets);
  });
});

describe('extname', () => {
  it('returns the correct extension', () => {
    expect(extname('c')).toEqual('c');

    // TODO: make sure to pick one that doesn't match
    // expect(extname('clojure')).toEqual('clj');
  });

  it('returns empty string if the extension is not found', () => {
    // @ts-expect-error intentionally incorrect
    expect(extname('ziltoid')).toEqual('');
  });
});
