import { ConfidentialClientApplication } from '@azure/msal-node'

import { environment } from '@/src/environment'

const msalClientConfig = {
  auth: {
    // TODO add environment utility
    clientId: environment.msalClientId,
    authority: `https://login.microsoftonline.com/${environment.msalTenantId}`,
    clientSecret: process.env.MSAL_CLIENT_SECRET,
  },
}

export const msalClient = new ConfidentialClientApplication(msalClientConfig)
