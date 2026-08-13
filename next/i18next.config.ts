import { defineConfig } from 'i18next-cli'

// Docs: https://github.com/i18next/i18next-cli
export default defineConfig({
  locales: ['sk', 'en'], // This should be in sync with next-i18next.config.js
  extract: {
    input: 'src/**/*.{tsx,ts}',
    output: 'public/locales/{{language}}/{{namespace}}.json',
    defaultNS: 'translation', // This should be in sync with next-i18next.config.js
    keySeparator: false,
    functions: ['t', '*.t'],
    transComponents: ['Trans'],
    sort: true,
    // Types are currently not needed by us
    // types: {
    //   input: ['public/locales/{{language}}/{{namespace}}.json'],
    //   output: 'src/types/i18next.d.ts',
    // },
  },
})
