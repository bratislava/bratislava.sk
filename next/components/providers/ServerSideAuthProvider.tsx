// TODO remove eslint-disable when types are fixed in amplify-js v6 release
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { awsConfig } from '@utils/amplify'
import { withSSRContext } from 'aws-amplify'
import { AccountType, Tier, UserData } from 'backend/dtos/userDto'
import { GetServerSidePropsContext } from 'next'
import { ComponentType, createContext, useContext } from 'react'

export interface GetSSRCurrentAuth {
  userData: UserData | null
}

// provides all the user data frontend might need as server side props
// this way, FE can always access cognito data in a sync manner
export const getSSRCurrentAuth = async (
  req: GetServerSidePropsContext['req'],
): Promise<GetSSRCurrentAuth> => {
  const SSR = withSSRContext({ req })
  SSR.Auth.configure(awsConfig)
  let userData = null
  try {
    const currentUser = await SSR.Auth.currentAuthenticatedUser()
    userData = currentUser.attributes || null
  } catch (error) {
    // TODO Auth throws this exact string, not an error object - refactor once amplify solves this
    if (error !== 'The user is not authenticated' && error !== 'No current user') {
      console.error('getServersideAuth error:', error)
    }
  }
  return { userData }
}

// TODO types should get fixed in amplify-js v6 release
export const getSSRAccessToken = async (req: GetServerSidePropsContext['req']): Promise<string> => {
  const SSR = withSSRContext({ req })
  try {
    const currentSession = await SSR.Auth.currentSession()
    return (currentSession?.getAccessToken()?.getJwtToken() as string) || ''
  } catch (error) {
    if (error !== 'The user is not authenticated' && error !== 'No current user') {
      console.error('getServersideAuth error:', error)
    }
  }
  return ''
}

export const ServerSideAuthContext = createContext<GetSSRCurrentAuth>({
  userData: null,
})

// only provides the data when given, does no further check on whether they are available. Thus, usable also for pages with optional auth
export const ServerSideAuthProviderHOC = <
  Props extends { ssrCurrentAuthProps?: GetSSRCurrentAuth },
>(
  Wrapped: ComponentType<Props>,
) => {
  // eslint-disable-next-line react/function-component-definition
  return (props: Props) => (
    // eslint-disable-next-line react/destructuring-assignment
    <ServerSideAuthContext.Provider value={props.ssrCurrentAuthProps || { userData: null }}>
      <Wrapped {...props} />
    </ServerSideAuthContext.Provider>
  )
}

export const useServerSideAuth = () => {
  const serverSideAuthContext = useContext(ServerSideAuthContext)
  const { userData } = serverSideAuthContext
  const tier = userData?.['custom:tier']

  return {
    ...serverSideAuthContext,
    isAuthenticated: !!userData,
    accountType: userData?.['custom:account_type'],
    // helper, since we usually determine what to display this way, slightly convoluted because of ts rules & undefined vs boolean
    isLegalEntity: userData?.['custom:account_type']
      ? [AccountType.FyzickaOsobaPodnikatel, AccountType.PravnickaOsoba].includes(
          userData?.['custom:account_type'],
        )
      : false,
    tierStatus: {
      tier,
      isIdentityVerified: tier === Tier.IDENTITY_CARD || tier === Tier.EID,
      isIdentityVerificationNotYetAttempted: !tier || tier === Tier.NEW,
    },
  }
}
