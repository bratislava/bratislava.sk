// TODO remove eslint-disable when types are fixed in amplify-js v6 release
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { withSSRContext } from 'aws-amplify'
import { UserData } from 'backend/dtos/userDto'
import { GetServerSidePropsContext } from 'next'
import { ComponentType, createContext } from 'react'

export interface GetSSRCurrentAuth {
  userData: UserData | null
}

// provides all the user data frontend might need as server side props
// this way, FE can always access cognito data in a sync manner
export const getSSRCurrentAuth = async (
  req: GetServerSidePropsContext['req'],
): Promise<GetSSRCurrentAuth> => {
  const SSR = withSSRContext({ req })
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
