module.exports = {
  extends: [
    'auto',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:i18next/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    /** We use this a lot with isDefined and hasAttributes */
    'unicorn/no-array-callback-reference': 'off',
    /** Named export is easier to refactor automatically */
    'import/prefer-default-export': 'off',
    /** Too tedious to type every function return explicitly */
    '@typescript-eslint/explicit-function-return-type': 'off',
    /** We prefer arrow functions */
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    /** It's annoying to refactor from one style to another */
    'arrow-body-style': 'off',
    /** These are exceptions that we use with "__" */
    'no-underscore-dangle': [
      2,
      { allow: ['__NEXT_DATA__', '__NEXT_LOADED_PAGES__', '__typename'] },
    ],
    'no-secrets/no-secrets': 'off',
    /** Doesn't work without changing our ts config */
    'unicorn/prefer-spread': 'off',
    /** We specify default props in props decomposition */
    'react/require-default-props': 'off',
    /** Next Link does not need href in <a> tag */
    'jsx-a11y/anchor-is-valid': 'off',
    /** Do not work in our case */
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'lodash/prefer-noop': 'off',
    'jsx-a11y/img-redundant-alt': 'warn',
    '@next/next/no-img-element': 'off',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    // https://github.com/jsx-eslint/eslint-plugin-react/issues/2584#issuecomment-1191175244
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
    'pii/no-phone-number': 'off',
    'pii/no-email': 'off',
    'const-case/uppercase': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'import/extensions': 'off',
    'react/display-name': 'off',
    'unicorn/expiring-todo-comments': 'off',

    /* Formatting rules */
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // TODO revisit, prettier should not be run by eslint
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
  },
  ignorePatterns: ['*.config.*', 'graphql', '.eslintrc.js', '**/*.svg'],
}
