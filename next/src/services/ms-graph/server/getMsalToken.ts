import { serverEnvironment } from '@/src/environment.server'
import { msalClient } from '@/src/services/ms-graph/server/msalClient'

/**
 * Get a token by msal library.
 * Caching of token should be taken care of by the msal library
 */
export const getMsalToken = async () => {
  // TODO use environment utility
  return msalClient.acquireTokenByClientCredential({
    scopes: [serverEnvironment.msalScope],
  })
}
