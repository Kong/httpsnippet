/** @type { import('@jest/types').Config.InitialOptions } */
module.exports = {
  collectCoverage: false,
  moduleFileExtensions: ['ts', 'js'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  testEnvironment: 'node',
  testRegex: ['.+\\.test\\.tsx?$'],
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
