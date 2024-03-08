module.exports = {
  root: true,
  env: {browser: true, es2021: true},
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:react-i18n/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['simple-import-sort', 'prettier', '@typescript-eslint', 'react-i18n'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: '.',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': ['error', {}, {usePrettierrc: true}],
    'arrow-parens': 0,
    'no-debugger': 1,
    'no-warning-comments': [
      1,
      {
        terms: ['hardcoded'],
        location: 'anywhere',
      },
    ],
    'no-return-await': 0,
    'object-curly-spacing': ['error', 'always'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-var': 'error',
    'comma-dangle': [1, 'always-multiline'],
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      1,
      {
        code: 100,
        comments: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-console': [
      1,
      {
        allow: ['warn', 'error'],
      },
    ],
    'react-i18n/no-dynamic-translation-keys': 'error',
    'react-i18n/no-missing-interpolation-keys': 'error',
    // disable unnecessary rules from recommendations
    'react/display-name': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
