module.exports = {
  locales: ['sk', 'en'], // this should be in sync with next-i18next.config.js - TODO get it from one place?
  input: '**/*.{tsx,ts}',
  output: './public/locales/$LOCALE/$NAMESPACE.json',
  // if set to true preserves old values in a separate json file
  createOldCatalogs: false,
  sort: true,
  // makes the translation json file flat
  keySeparator: false,
}
