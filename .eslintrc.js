module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  globals: {
    JSX: true,
  },
}
