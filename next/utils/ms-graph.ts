export interface TokenResponse {
  token_type: string
  expires_in: number
  ext_expires_in: number
  access_token: string
}

export const getToken = async (): Promise<TokenResponse> => {
  const formData = new URLSearchParams()
  formData.append('grant_type', process.env.NEXT_PUBLIC_MSAL_GRANT_TYPE)
  formData.append('client_id', process.env.NEXT_PUBLIC_MSAL_CLIENT_ID)
  formData.append('client_secret', process.env.NEXT_PUBLIC_MSAL_CLIENT_SECRET)
  formData.append('scope', process.env.NEXT_PUBLIC_MSAL_SCOPE)

  const result = await fetch(
    `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_TENANT_ID}/oauth2/v2.0/token`,
    {
      body: formData,
      method: 'post',
    }
  )

  const resultData = await result.json()

  if (resultData.error) {
    const error = new Error(resultData.error.message)
    console.error(error)

    return {
      token_type: null,
      expires_in: null,
      ext_expires_in: null,
      access_token: null,
    }
  }

  return resultData
}

export interface UsersRequest {
  token: string
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

export const getUsers = async ({ token }: UsersRequest): Promise<any> => {
  const result = await fetch(`https://graph.microsoft.com/v1.0/users`, {
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
