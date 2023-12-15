import { msalClient } from '@backend/ms-graph/msalClient'

/**
 * Get a token by msal library.
 * Caching of token should be taken care of by the msal library
 */
export const getMsalToken = async () => {
  // TODO use environment utility
  return msalClient.acquireTokenByClientCredential({
    scopes: [process.env.MSAL_SCOPE ?? ''],
  })
}
