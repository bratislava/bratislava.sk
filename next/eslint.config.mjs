import { createNextConfig } from '@bratislava/eslint-config-next'

export default [
  ...createNextConfig({
    ignores: ['graphql/**', 'src/services/graphql/**'],
  }),

  // Project-specific rule overrides
  {
    rules: {
      'i18next/no-literal-string': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/img-redundant-alt': 'warn',
      'no-multi-spaces': 'error',
      'require-await': 'warn',
      'sonarjs/deprecation': 'warn',

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
      'sonarjs/slow-regex': 'off',
      'sonarjs/prefer-regexp-exec': 'off',
      'security/detect-unsafe-regex': 'off',
      'security/detect-object-injection': 'off',
      'no-implicit-coercion': 'off',
      'sonarjs/no-redundant-optional': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-unnecessary-type-conversion': 'warn',
    },
  },
]
