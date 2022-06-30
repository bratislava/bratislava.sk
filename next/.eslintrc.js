module.exports = {
  extends: ['auto', 'plugin:tailwindcss/recommended', 'plugin:@next/next/recommended'],
  plugins: ['only-warn'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    /** We use this a lot with isDefined and hasAttributes */
    'unicorn/no-array-callback-reference': 'off',
    // Named export is easier to refactor automatically
    'import/prefer-default-export': 'off',
    /** Too tedious to type every function return explicitly */
    '@typescript-eslint/explicit-function-return-type': 'off',
    /** We prefer arrow functions */
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    /** It's annoying to refactor from one style to another */
    'arrow-body-style': 'off',
    /** This are exceptions that we use with "__" */
    'no-underscore-dangle': [2, { allow: ['__NEXT_DATA__', '__NEXT_LOADED_PAGES__', '__typename'] }],
    /** Links get confused for secrets */
    'no-secrets/no-secrets': ['error', { ignoreContent: '^http' }],
    /** Use official sorting */
    'tailwindcss/classnames-order': [
      'warn',
      {
        officialSorting: true,
      },
    ],
  },
  ignorePatterns: ['*.config.*', 'graphql', '.eslintrc.js'],
}
