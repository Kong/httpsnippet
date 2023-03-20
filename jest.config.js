/** @type { import('@jest/types').Config.InitialOptions } */
module.exports = {
  collectCoverage: false,
  injectGlobals: false,
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  testEnvironment: 'node',
  testRegex: ['.+\\.test\\.ts$'],
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true,
      },
    ],
  },
};
