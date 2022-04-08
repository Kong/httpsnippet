const { ERROR } = require('eslint-config-helpers');

/** @type { import('eslint').Linter.Config } */
module.exports = {
  parser: '@typescript-eslint/parser',
  rules: {
    quotes: [ERROR, 'single'],
  },
};
