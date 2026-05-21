import { createNextConfig } from '@bratislava/eslint-config-next'

export default [
  ...createNextConfig({
    ignores: ['graphql/**', 'src/services/graphql/**'],
  }),
  // https://github.com/bratislava/eslint-config/blob/b17b3028c67e639cf5cef183817f9087d6281d7e/packages/next/README.md#tailwind-css
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: './src/styles/globals.css',
        callees: ['cx', 'classnames', 'clsx', 'cn', 'twMerge', 'tw'],
      },
    },
  },
  // Project-specific rule overrides
  {
    rules: {
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'no-multi-spaces': 'error',

      // TODO good rules, require work to fix and were skipped over in eslint v9 upgrade
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
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

      '@typescript-eslint/no-unnecessary-condition': 'warn', // 170 violations
      'sonarjs/no-redundant-optional': 'warn', // 28 violations
      '@typescript-eslint/no-unsafe-member-access': 'warn', // 16 violations
      '@typescript-eslint/no-non-null-assertion': 'warn', // 10 violations
      'require-await': 'warn', // 10 violations
      'sonarjs/deprecation': 'warn', // 10 violations
      '@typescript-eslint/no-deprecated': 'warn', // 9 violations
      '@typescript-eslint/require-await': 'warn', // 5 violations
      '@typescript-eslint/switch-exhaustiveness-check': 'warn', // 5 violations
      'react/no-unknown-property': 'warn', // 4 violations
      'jsx-a11y/click-events-have-key-events': 'warn', // 3 violations
      'jsx-a11y/no-static-element-interactions': 'warn', // 3 violations
      'react-hooks/set-state-in-effect': 'warn', // 3 violations
    },
  },
]
