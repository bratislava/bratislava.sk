module.exports = {
  extends: ['auto', 'plugin:tailwindcss/recommended', 'plugin:@next/next/recommended'],
  plugins: ['only-warn'],
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
    /** This are exceptions that we use with "__" */
    'no-underscore-dangle': [
      2,
      { allow: ['__NEXT_DATA__', '__NEXT_LOADED_PAGES__', '__typename'] },
    ],
    /** Links get confused for secrets */
    'no-secrets/no-secrets': [
      'error',
      {
        ignoreContent: [
          // https://stackoverflow.com/a/3809435
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm,
        ],
      },
    ],
    /** Doesn't work without changing our ts config */
    'unicorn/prefer-spread': 'off',
    /** Use official sorting */
    'tailwindcss/classnames-order': ['warn', { callees: ['classnames', 'cx', 'twMerge'] }],
    /** We specify default props in props decomposition */
    'react/require-default-props': 'off',
    /** Next Link does not need href in <a> tag */
    'jsx-a11y/anchor-is-valid': 'off',
    /** Do not work in our case */
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    'lodash/prefer-noop': 'off',
    'jsx-a11y/img-redundant-alt': 'warn',
    '@next/next/no-img-element': 'off',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    // https://github.com/jsx-eslint/eslint-plugin-react/issues/2584#issuecomment-1191175244
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
    'pii/no-phone-number': 'off',
    'const-case/uppercase': 'off',
    // Solve warning "Promise-returning function provided to attribute where a void return was expected."
    // '@typescript-eslint/no-misused-promises': [
    //   2,
    //   {
    //     checksVoidReturn: {
    //       attributes: false,
    //     },
    //   },
    // ],
  },
  ignorePatterns: ['*.config.*', 'graphql', '.eslintrc.js'],
}
