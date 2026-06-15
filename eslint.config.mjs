import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import litPlugin from 'eslint-plugin-lit';
import wcPlugin from 'eslint-plugin-wc';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      lit: litPlugin,
      wc: wcPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...litPlugin.configs.recommended.rules,
      ...wcPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'wc/no-constructor-attributes': 'error',
      'wc/no-invalid-element-name': 'error',
    },
  },
  {
    files: ['**/*.test.ts', 'tests/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
      },
    },
    rules: {
      // Chai assertion chains like `expect(x).to.exist` are property-getter side effects
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'storybook-static/**',
      'coverage/**',
      '*.cjs',
      'vite.config.ts',
      'playwright.config.ts',
      'web-test-runner.config.mjs',
      '.storybook/**',
    ],
  },
  prettierConfig,
];
