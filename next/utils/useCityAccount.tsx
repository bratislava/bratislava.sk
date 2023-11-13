import { CityAccountUser } from '@backend/dtos/user.dto'
import { useQuery } from '@tanstack/react-query'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import React, { useCallback, useState } from 'react'
import Cookies from 'universal-cookie'

import { getAccessTokenFromRefreshToken, getAccount } from './accountHelpers'

export type CityAccountAuthenticationStatus = 'initializing' | 'authenticated' | 'unauthenticated'

interface CityAccountState {
  status: CityAccountAuthenticationStatus
  accessToken: string | null
  loading: boolean
  data?: CityAccountUser
}

const CityAccountContext = React.createContext<CityAccountState>({} as CityAccountState)

const cookies = new Cookies()

const ACCESS_TOKEN_COOKIE_KEY = 'accessToken'
const REFRESH_TOKEN_COOKIE_KEY = 'refreshToken'

export const signOut = () => {
  const url = new URL(`${process.env.NEXT_PUBLIC_CITY_ACCOUNT_URL}/logout`)
  url.searchParams.set('from', window.location.href)
  window.location.href = url.toString()
}

export const CityAccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [initializationState, setInitializationState] = useState<
    'initializing' | 'ready' | 'refetched'
  >('initializing')

  const [accessToken, setAccessToken] = useState<string | null>(
    cookies.get(ACCESS_TOKEN_COOKIE_KEY),
  )

  let jwtAccessToken = null
  try {
    jwtAccessToken = accessToken ? jwtDecode<JwtPayload>(accessToken) : null
  } catch (error) {}
  let status: CityAccountAuthenticationStatus = 'initializing'
  if (initializationState === 'ready') {
    status = jwtAccessToken ? 'authenticated' : 'unauthenticated'
  }

  const onRefreshToken = useCallback(async () => {
    setInitializationState('refetched')
    const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_KEY)

    if (!refreshToken) {
      setAccessToken(null)
      setInitializationState('ready')
      return null
    }

    let newAccessToken = null

    try {
      newAccessToken = await getAccessTokenFromRefreshToken(refreshToken)
    } catch (error) {
      setAccessToken(null)
      setInitializationState('ready')
      cookies.remove(REFRESH_TOKEN_COOKIE_KEY, {
        domain: process.env.NEXT_PUBLIC_COGNITO_COOKIE_STORAGE_DOMAIN,
      })
      return null
    }

    cookies.set(ACCESS_TOKEN_COOKIE_KEY, newAccessToken, {
      domain: process.env.NEXT_PUBLIC_COGNITO_COOKIE_STORAGE_DOMAIN,
      path: '/',
      secure: process.env.NEXT_PUBLIC_COGNITO_COOKIE_STORAGE_DOMAIN !== 'localhost',
      sameSite: true,
    })

    setAccessToken(newAccessToken)
  }, [])

  const query = useQuery({
    queryKey: ['userData', jwtAccessToken?.sub],
    queryFn: () => getAccount(accessToken),
    staleTime: Infinity,
    retry: false,
    onSuccess: () => {
      setInitializationState('ready')
    },
    onError: () => {
      if (initializationState === 'initializing') {
        onRefreshToken()
      } else {
        setInitializationState('ready')
      }
    },
  })

  return (
    <CityAccountContext.Provider
      value={{
        data: query.data as CityAccountUser,
        loading: query.isLoading || status === 'initializing',
        accessToken,
        status,
      }}
    >
      {children}
    </CityAccountContext.Provider>
  )
}

export default function useCityAccount() {
  const context = React.useContext(CityAccountContext)
  if (context === undefined) {
    throw new Error('useCityAccountAccessToken must be used within a CityAccountProvider')
  }
  return context
}
