import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import security from 'eslint-plugin-security'
import noUnsanitized from 'eslint-plugin-no-unsanitized'
import sonarjs from 'eslint-plugin-sonarjs'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import i18next from 'eslint-plugin-i18next'
import tanstackQuery from '@tanstack/eslint-plugin-query'
// import nextPlugin from '@next/eslint-plugin-next' // Disabled due to ESLint v9 compatibility
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  // Base configuration for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
        ecmaVersion: 2021,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        Buffer: 'readonly',
        process: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        Express: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      security: security,
      'no-unsanitized': noUnsanitized,
      sonarjs: sonarjs,
      i18next: i18next,
      '@tanstack/query': tanstackQuery,
      // '@next/next': nextPlugin, // Disabled due to ESLint v9 compatibility
    },
    rules: {
      // rulesets
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs['recommended-type-checked'].rules,
      ...tseslint.configs.stylistic.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      ...prettier.rules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      ...security.configs.recommended.rules,
      ...noUnsanitized.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
      ...i18next.configs.recommended.rules,
      ...tanstackQuery.configs.recommended.rules,

      // Additional TypeScript ESLint rules from common config
      '@typescript-eslint/no-restricted-imports': 'error',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-empty-function': 'off',

      // Additional ESLint rules from common config
      'no-console': 'warn',
      'array-callback-return': 'error',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-assignment': 'error',
      'block-scoped-var': 'error',
      'consistent-return': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'smart'],
      'new-cap': ['error', { capIsNew: false }],
      'no-caller': 'error',
      'no-div-regex': 'error',
      'no-else-return': 'error',
      'no-implicit-coercion': 'error',
      'no-invalid-this': 'error',
      'no-lonely-if': 'error',
      'no-multi-spaces': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      'require-await': 'warn',
      yoda: 'error',

      // common SonarJS configuration extension
      'sonarjs/fixme-tag': 'warn',
      'sonarjs/deprecation': 'warn',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/prefer-immediate-return': 'off',
      'sonarjs/no-useless-catch': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/todo-tag': 'off',
      'sonarjs/no-nested-conditional': 'off',
      // Disable sonarjs/different-types-comparison until JS-619 is resolved
      // https://sonarsource.atlassian.net/browse/JS-619
      'sonarjs/different-types-comparison': 'off',

      // FE/project specifuc config

      // React specific rules
      'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
      'react/display-name': 'off',

      // Import rules
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',

      // JSX A11y rules
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/img-redundant-alt': 'warn',

      // i18next rules
      'i18next/no-literal-string': 'off',

      // Disabled rules from previous config
      'max-classes-per-file': 'off',
      'class-methods-use-this': 'off',
      'no-useless-catch': 'off',
      'no-await-in-loop': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Custom rules from original config
      'no-underscore-dangle': [
        2,
        { allow: ['__NEXT_DATA__', '__NEXT_LOADED_PAGES__', '__typename'] },
      ],
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],

      // TODO good rules, require work to fix and were skipped over in eslint v9 upgrade
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': 'warn',
      'sonarjs/function-return-type': 'warn',
      'sonarjs/regex-complexity': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      'sonarjs/no-unsafe-unzip': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'import/no-unresolved': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-duplicates': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'sonarjs/slow-regex': 'off',
      'sonarjs/prefer-regexp-exec': 'off',
      'security/detect-unsafe-regex': 'off',
      'security/detect-object-injection': 'off',
      'no-implicit-coercion': 'off',
      'no-undef': 'off', // TypeScript handles this

      // Disable rules that don't exist or cause issues
      'const-case/uppercase': 'off',
      'sonarjs/no-redundant-optional': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  // Next.js specific configuration
  {
    files: ['**/pages/**/*.{js,jsx,ts,tsx}', '**/src/pages/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/display-name': 'off',
    },
  },
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      'eslint.config.js',
      'eslint.config.mjs',
      '**/*.svg',
      'graphql/**',
      '.next/**',
      'out/**',
    ],
  }
];
