import { describe, it, expect } from 'vitest';

import { availableTargets, extname } from './utils.js';

describe('availableTargets', () => {
  it('returns all available targets', () => {
    expect(availableTargets()).toMatchSnapshot();
  });
});

describe('extname', () => {
  it('returns the correct extension', () => {
    expect(extname('c', 'libcurl')).toBe('.c');
    expect(extname('clojure', 'clj_http')).toBe('.clj');
    expect(extname('javascript', 'axios')).toBe('.js');
    expect(extname('node', 'axios')).toBe('.cjs');
  });

  it('returns empty string if the extension is not found', () => {
    // @ts-expect-error intentionally incorrect
    expect(extname('ziltoid')).toBe('');
  });
});
