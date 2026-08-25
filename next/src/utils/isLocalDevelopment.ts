/**
 * NODE_ENV is 'development' only under `next dev`, so this is false on the deployed
 * dev, staging and prod environments.
 *
 * `process.env.NODE_ENV` is inlined by Next.js at build time,
 * so unlike the rest of the server environment it is also readable in the browser bundle.
 * That's why we don't import the value from environment.server.ts.
 */

export const isLocalDevelopment = () => process.env.NODE_ENV === 'development'
