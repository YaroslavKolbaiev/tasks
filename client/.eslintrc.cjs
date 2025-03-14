module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@stylistic', 'react-refresh'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.app.json',
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-newline': 2,
    'import/prefer-default-export': 0,
    'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'always' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'max-len': ['error', { code: 200, tabWidth: 2, ignoreUrls: true }],
    'max-params': ['error', 3],
  },
};
