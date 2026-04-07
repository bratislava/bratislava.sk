import { ConfidentialClientApplication } from '@azure/msal-node'

const msalClientConfig = {
  auth: {
    // TODO add environment utility
    clientId: process.env.MSAL_CLIENT_ID ?? '',
    authority: `https://login.microsoftonline.com/${process.env.MSAL_TENANT_ID}`,
    clientSecret: process.env.MSAL_CLIENT_SECRET,
  },
}

export const msalClient = new ConfidentialClientApplication(msalClientConfig)
