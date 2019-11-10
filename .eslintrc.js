module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 2,
    'import/order': ['error', {'newlines-between': 'always'}],
    'import/no-unresolved': 2,
    'import/no-dynamic-require': 2,
    'import/no-mutable-exports': 2,
    'import/export': 2,
    'import/no-commonjs': 2,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/exports-last': 2,
    'import/named': 0
  }
};
