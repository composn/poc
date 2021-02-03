module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['index.js'],
  rules: {
    'import/extensions': [
      'error',
      {
        js: 'never',
        mjs: 'never',
        vue: 'never',
        json: 'never',
      },
    ],
    'linebreak-style': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: 'next',
      },
    ],
  },
};
