// Inspired by https://jfranciscosousa.com/blog/validating-environment-variables-with-zod/
// Secures typesafe access to environmental variables.

function assertEnv<T>(variable: string, value: T) {
  if (!value) {
    throw new Error(`Missing environment variable: ${variable}`)
  }

  return value
}

export const serverEnvironment = {
  msalScope: assertEnv('MSAL_SCOPE', process.env.MSAL_SCOPE),
  revalidateSecretToken: assertEnv('REVALIDATE_SECRET_TOKEN', process.env.REVALIDATE_SECRET_TOKEN),
}
