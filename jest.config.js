/** @type { import('@jest/types').Config.InitialOptions } */
module.exports = {
  collectCoverage: false,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  resetMocks: true,
  resetModules: true,
  testEnvironment: 'node',
  testRegex: ['.+\\.test\\.tsx?$'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  // verbose: true,
};
