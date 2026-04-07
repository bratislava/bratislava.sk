import { ConfidentialClientApplication } from '@azure/msal-node'

import { serverEnvironment } from '@/src/environment.server'

const msalClientConfig = {
  auth: {
    // TODO add environment utility
    clientId: serverEnvironment.msalClientId,
    authority: `https://login.microsoftonline.com/${serverEnvironment.msalTenantId}`,
    clientSecret: serverEnvironment.msalClientSecret,
  },
}

export const msalClient = new ConfidentialClientApplication(msalClientConfig)
