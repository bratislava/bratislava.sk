module.exports = {
  extends: [
    'auto',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:i18next/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
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
      { allow: ['__NEXT_DATA__', '__NEXT_LOADED_PAGES__', '__typename'] }, // TODO add '__errors' ? - see Konto
    ],
    /** Too many false positives, especially with i18n keys */
    'no-secrets/no-secrets': 'off',
    /** Doesn't work without changing our ts config */
    'unicorn/prefer-spread': 'off', // TODO enable - see Kniznica, Marianum, OLO, remove also on Konto
    /** We specify default props in props decomposition */
    'react/require-default-props': 'off',
    /** This is no longer needed since React 17 */
    'react/react-in-jsx-scope': 'off',
    /** Next Link does not need href in <a> tag */
    'jsx-a11y/anchor-is-valid': 'off',
    /** Do not work in our case */
    '@typescript-eslint/no-unsafe-assignment': 'off', // TODO enable
    'lodash/prefer-noop': 'off',
    'jsx-a11y/img-redundant-alt': 'warn',
    '@next/next/no-img-element': 'off', // TODO enable
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }], // This works the best
    // https://github.com/jsx-eslint/eslint-plugin-react/issues/2584#issuecomment-1191175244
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],

    // Many false positives, if we add email/phone we probably want to have it anyway
    'pii/no-phone-number': 'off',
    'pii/no-email': 'off',
    // Good rationale, but doesn't work for us
    'const-case/uppercase': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'unicorn/expiring-todo-comments': 'off',

    // TODO revisit, it appeared after refactor to using @/* path alias
    'import/extensions': 'off',
    'react/display-name': 'off',

    /* Formatting rules */
    'prettier/prettier': ['error', { endOfLine: 'auto' }], // TODO revisit, prettier should not be run by eslint
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
  },
  ignorePatterns: ['*.config.*', 'graphql', '.eslintrc.js', '**/*.svg'],
}
