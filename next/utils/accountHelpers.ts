import { CityAccountUser } from '@backend/dtos/user.dto'
import jwtDecode, { JwtPayload } from 'jwt-decode'

/**
 * returns the same token if it's well formed and not expired
 * otherwise returns null
 */
export const checkTokenValid = (token: string | null | undefined) => {
  if (!token) return null
  let decodedToken = null
  try {
    decodedToken = jwtDecode<JwtPayload>(token)
  } catch (error) {
    return null
  }
  if (decodedToken && (decodedToken.exp || 0) * 1000 > Date.now()) {
    return token
  }
  return null
}

export const getAccount = async (accessToken: string) => {
  if (!accessToken) throw new Error('No access token provided')
  if (!checkTokenValid(accessToken)) throw new Error('Access token is invalid')

  const result = await fetch(`${process.env.NEXT_PUBLIC_CITY_ACCOUNT_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!result.ok) {
    throw result.status === 401 ? new Error('Unauthorized') : new Error('Error fetching account')
  }
  return result.json() as Partial<CityAccountUser>
}

export const getAccessTokenFromRefreshToken = async (refreshToken: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_COGNITO_URL, {
    headers: {
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      'Content-Type': 'application/x-amz-json-1.1',
    },
    mode: 'cors',
    cache: 'no-cache',
    method: 'POST',
    body: JSON.stringify({
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      AuthFlow: 'REFRESH_TOKEN',
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    }),
  })

  const data = await res.json()

  if (!data?.AuthenticationResult?.AccessToken) {
    throw new Error('Unauthorized')
  }

  return data.AuthenticationResult.AccessToken
}
