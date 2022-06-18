import * as msal from '@azure/msal-browser'

const msalConfig = {
  auth: {
    // clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
    // authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    clientId: '388dfd80-9ae1-40f8-8229-bf2ce9f55b6b',
    authority: `https://login.microsoftonline.com/fe69e74e-1e66-4fcb-99c5-58e4a2d2a063`,
    redirectUri: '/',
  },
}

const msalInstance = new msal.PublicClientApplication(msalConfig)

export { msalInstance }
