// Inspired by https://jfranciscosousa.com/blog/validating-environment-variables-with-zod/
// Secures typesafe access to environmental variables.

function assertEnv<T>(variable: string, value: T) {
  if (!value) {
    throw new Error(`Missing environment variable: ${variable}`)
  }

  return value
}

export const serverEnvironment = {
  nodeEnv: assertEnv('NODE_ENV', process.env.NODE_ENV),
  msalScope: assertEnv('MSAL_SCOPE', process.env.MSAL_SCOPE),
  msalClientId: assertEnv('MSAL_CLIENT_ID', process.env.MSAL_CLIENT_ID),
  msalTenantId: assertEnv('MSAL_TENANT_ID', process.env.MSAL_TENANT_ID),
  ginisHostUde: assertEnv('GINIS_HOST_UDE', process.env.GINIS_HOST_UDE),
  // Meilisearch conversational search, used only by the /chat page. Not asserted on purpose - when it is missing, the
  // chat api route returns 503 instead of breaking the whole app.
  meilisearchChatApiKey: process.env.MEILISEARCH_CHAT_API_KEY,
  meilisearchChatWorkspace: process.env.MEILISEARCH_CHAT_WORKSPACE,
  meilisearchChatModel: process.env.MEILISEARCH_CHAT_MODEL,
}
