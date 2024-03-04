// https://next-intl-docs.vercel.app/docs/usage/typescript
type Messages = typeof import('./messages/sk.json')
declare type IntlMessages = Messages & {}
