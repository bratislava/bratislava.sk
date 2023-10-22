/* eslint-disable import/no-extraneous-dependencies */
// @aws-amplify/auth & @aws-amplify/core are part of aws-amplify & safe enough to import here like this
// this import fixes issues with Jest not being able to parse esm lib imported in the root of aws-amplify
import { useServerSideAuth } from '@components/providers/ServerSideAuthProvider'
import { Amplify, Auth } from 'aws-amplify'
import { useEffect, useState } from 'react'

export const awsConfig = {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: process.env.NEXT_PUBLIC_AWS_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    signUpVerificationMethod: 'code',
  },
  ssr: true,
}

// TODO once env handling is merged update not to use process.env directly
Amplify.configure(awsConfig)

// if anything happens when getting the token, does nothing - may swallow errors
export const getAccessToken = async () => {
  try {
    const session = await Auth.currentSession()
    return session.getAccessToken().getJwtToken()
  } catch (error) {
    if (error === 'The user is not authenticated' || error === 'No current user') {
      // expected case, user is not authenticated
      return null
    }
    throw error
  }
}

// Auth.getCurrentAuthenticatedUser throws when not authenticated
// this helper changes that and ignores any other potential errors
export const getCurrentAuthenticatedUser = async () => {
  try {
    // TODO should be solved in v6 release of aws-amplify
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await Auth.currentAuthenticatedUser()
  } catch (error) {
    return null
  }
}

export const useUser = () => {
  const [user, setUser] = useState(null)

  const { userData } = useServerSideAuth()

  const getUser = async () => {
    const currentUser = await getCurrentAuthenticatedUser()
    setUser(currentUser.attributes)
  }

  const signOut = async () => {
    await Auth.signOut()
    setUser(null)
  }

  useEffect(() => {
    if (!userData) {
      getUser()
    }
  }, [])

  return { signOut, user: userData || user }
}
