// TODO remove eslint-disable when types are fixed in amplify-js v6 release
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { awsConfig, getCurrentAuthenticatedUser } from '@utils/amplify'
import { createStore } from '@utils/store'
import { Auth, withSSRContext } from 'aws-amplify'
import { AccountType, Tier, UserData } from 'backend/dtos/userDto'
import { GetServerSidePropsContext } from 'next'
import { ComponentType, createContext, useCallback, useEffect, useState } from 'react'

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

export const userStore = createStore({ userData: null })

export const ServerSideAuthContext = createContext<GetSSRCurrentAuth>({
  userData: null,
})

const setUserStore = (ssrCurrentAuthProps) => {
  const { userData } = ssrCurrentAuthProps || {}
  const tier = userData?.['custom:tier']

  userStore.setState(() =>
    userData
      ? {
          ...ssrCurrentAuthProps,
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
      : { userData: null },
  )
}

// only provides the data when given, does no further check on whether they are available. Thus, usable also for pages with optional auth
export const ServerSideAuthProviderHOC = <
  Props extends { ssrCurrentAuthProps?: GetSSRCurrentAuth },
>(
  Wrapped: ComponentType<Props>,
) => {
  // eslint-disable-next-line react/function-component-definition
  return (props: Props) => {
    // eslint-disable-next-line react/destructuring-assignment
    setUserStore(props.ssrCurrentAuthProps || null)

    return <Wrapped {...props} />
  }
}

const useStoreSelector = (store, selector) => {
  const [state, setState] = useState(() => selector(store.getState()))

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.getState()))
    })

    console.log('storeChange', selector(store.getState()), store.getState())
    setState(selector(store.getState()))
    return unsubscribe
  }, [store, selector])

  console.log('useStoreSelector', state)
  return state
}

export const useUser = (callback) => {
  const userProps = useStoreSelector(userStore, useCallback(callback, []))

  const getUser = async () => {
    const currentUser = await getCurrentAuthenticatedUser()

    setUserStore(currentUser)
  }

  const signOut = async () => {
    await Auth.signOut()
    userStore.setState(() => ({ userData: null }))
  }

  useEffect(() => {
    if (!userProps?.userData) {
      getUser()
    }
  }, [])

  console.log('useUser', userProps)

  return { signOut, ...userProps, user: userProps?.userData }
}
