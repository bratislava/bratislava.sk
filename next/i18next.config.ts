import { defineConfig } from 'i18next-cli'
import i18nextConfig from './next-i18next.config'

// Docs: https://github.com/i18next/i18next-cli
export default defineConfig({
  locales: i18nextConfig.i18n.locales,
  extract: {
    input: 'src/**/*.{tsx,ts}',
    output: 'public/locales/{{language}}/{{namespace}}.json',
    defaultNS: 'translation', // Changed to match the namespace used by i18next-cli,
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
