export interface TokenResponse {
  token_type: string
  expires_in: number
  ext_expires_in: number
  access_token: string
}

export const getToken = async (): Promise<TokenResponse> => {
  const formData = new URLSearchParams()
  formData.append('grant_type', 'client_credentials')
  formData.append('client_id', 'a6f86f77-53f7-4a8c-a1e8-06671a2395b8')
  formData.append('client_secret', 'yIR8Q~AUoke372.TfYXGxiZgfW0tWx_D4mH7qdfQ')
  formData.append('scope', 'https://graph.microsoft.com/.default')

  const result = await fetch(
    `https://login.microsoftonline.com/fe69e74e-1e66-4fcb-99c5-58e4a2d2a063/oauth2/v2.0/token`,
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
