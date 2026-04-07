import { ConfidentialClientApplication } from '@azure/msal-node'

import { serverEnvironment } from '@/src/environment.server'

const msalClientConfig = {
  auth: {
    // TODO add environment utility
    clientId: serverEnvironment.msalClientId ?? '',
    authority: `https://login.microsoftonline.com/${serverEnvironment.msalTenantId}`,
    clientSecret: process.env.MSAL_CLIENT_SECRET,
  },
}

export const msalClient = new ConfidentialClientApplication(msalClientConfig)
