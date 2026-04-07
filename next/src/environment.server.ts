// Inspired by https://jfranciscosousa.com/blog/validating-environment-variables-with-zod/
// Secures typesafe access to environmental variables.

function assertEnv<T>(variable: string, value: T) {
  if (!value) {
    throw new Error(`Missing environment variable: ${variable}`)
  }

  return value
}

export const serverEnvironment = {
  ginisHostUde: assertEnv('GINIS_HOST_UDE', process.env.GINIS_HOST_UDE),
  ginisUsername: assertEnv('GINIS_USERNAME', process.env.GINIS_USERNAME),
  ginisPassword: assertEnv('GINIS_PASSWORD', process.env.GINIS_PASSWORD),
  msalScope: assertEnv('MSAL_SCOPE', process.env.MSAL_SCOPE),
  msalClientId: assertEnv('MSAL_CLIENT_ID', process.env.MSAL_CLIENT_ID),
  msalClientSecret: assertEnv('MSAL_CLIENT_SECRET', process.env.MSAL_CLIENT_SECRET),
  msalTenantId: assertEnv('MSAL_TENANT_ID', process.env.MSAL_TENANT_ID),
  nalgooApiKey: assertEnv('NALGOO_API_KEY', process.env.NALGOO_API_KEY),
  starzEcomailApiKey: assertEnv('STARZ_ECOMAIL_API_KEY', process.env.STARZ_ECOMAIL_API_KEY),
  revalidateSecretToken: assertEnv('REVALIDATE_SECRET_TOKEN', process.env.REVALIDATE_SECRET_TOKEN),
}
