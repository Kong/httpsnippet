/** @type { import('eslint').Linter.Config } */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/all',
    'plugin:jest-formatting/strict',
    'plugin:eslint-comments/recommended',
  ],
  plugins: ['eslint-comments', 'simple-import-sort', 'jest', 'jest-formatting'],
  rules: {
    'prefer-template': 'error',
    'no-else-return': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'eslint-comments/require-description': 'error',
    'eslint-comments/disable-enable-pair': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jest/prefer-expect-assertions': 'off',
    'jest/require-hook': 'off',
    'jest/max-expects': 'warn',
  },
};
