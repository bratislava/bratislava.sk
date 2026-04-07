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
  msalScope: assertEnv('MSAL_SCOPE', process.env.MSAL_SCOPE),
  nalgooApiKey: assertEnv('NALGOO_API_KEY', process.env.NALGOO_API_KEY),
  starzEcomailApiKey: assertEnv('STARZ_ECOMAIL_API_KEY', process.env.STARZ_ECOMAIL_API_KEY),
  revalidateSecretToken: assertEnv('REVALIDATE_SECRET_TOKEN', process.env.REVALIDATE_SECRET_TOKEN),
}
