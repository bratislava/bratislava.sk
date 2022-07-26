import { AuthenticationResult, ConfidentialClientApplication } from '@azure/msal-node'

const config = {
  auth: {
    clientId: process.env.MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MSAL_TENANT_ID}`,
    clientSecret: process.env.MSAL_CLIENT_SECRET,
  },
}

const cca = new ConfidentialClientApplication(config)

// caching of token should be taken care of by the msal library
export const getToken = async (): Promise<AuthenticationResult> => {
  return cca.acquireTokenByClientCredential({
    scopes: [process.env.MSAL_SCOPE],
  })
}

export interface UsersRequest {
  token: string
  url: string
}

export interface UserResponse {
  businessPhones: string[]
  displayName: string
  givenName?: string
  jobTitle?: string
  mail: string
  mobilePhone?: string
  officeLocation?: string
  preferredLanguage?: string
  surname?: string
  userPrincipalName: string
  id: string
}

export interface UsersResponse {
  '@odata.context'?: string
  '@odata.nextLink'?: string
  value: UserResponse[]
}

export const getUsers = async ({ token, url }: UsersRequest): Promise<any> => {
  const shortUrl = url.slice(4)
  const result = await fetch(`https://graph.microsoft.com/v1.0${shortUrl}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const resultData = await result.json()

  if (resultData.error) {
    const error = new Error(resultData.error.message)
    console.error(error)

    return {
      value: [],
    }
  }

  return resultData
}

export const usersFromDepartmentFetcher = (department) =>
  fetch(`/api/users?$filter=Department eq '${department}'`).then((r) => r.json())
