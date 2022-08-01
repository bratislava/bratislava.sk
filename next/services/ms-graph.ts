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
  department: string
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

interface GetUserByEmailParams {
  token: string
  email: string
}

// TODO consider rewriting these to fetch their own tokens instead of them being provided
export const getUserByEmail = async ({ token, email }: GetUserByEmailParams) => {
  const url = `https://graph.microsoft.com/v1.0/users/${email}`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.json()
}
export const getUsersByDepartment = async ({ token, department }: UsersRequest): Promise<any> => {
  const result = await fetch(`https://graph.microsoft.com/v1.0/users?$filter=Department eq '${department}'`, {
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
