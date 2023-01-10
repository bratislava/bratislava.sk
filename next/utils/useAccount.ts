import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'
import { AWSError } from 'aws-sdk/global'
import { useEffect, useState } from 'react'

export enum AccountStatus {
  Idle,
  NewPasswordRequired,
}

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
}
const userPool = new CognitoUserPool(poolData)

export default function useAccount() {
  const [user, setUser] = useState<CognitoUser | null>(null)
  const [error, setError] = useState<AWSError | undefined | null>(null)
  const [status, setStatus] = useState<AccountStatus>(AccountStatus.Idle)

  useEffect(() => {
    const currentUser = userPool.getCurrentUser()
    setUser(currentUser)
  }, [])

  const logout = () => {
    if (user) {
      user.signOut()
      setUser(null)
    }
  }

  const confirmPassword = (verificationCode: string, password: string) => {
    return new Promise((resolve) => {
      if (user) {
        user.confirmPassword(verificationCode, password, {
          onSuccess() {
            console.log('Password confirmed!')
            resolve(true)
          },
          onFailure(err: Error) {
            setError({ ...(err as AWSError) })
            resolve(false)
          },
        })
      } else {
        resolve(false)
      }
    })
  }

  const forgotPassword = (email = ''): Promise<boolean> => {
    const cognitoUser = email
      ? new CognitoUser({
          Username: email,
          Pool: userPool,
        })
      : user

    setError(null)
    return new Promise((resolve) => {
      if (cognitoUser) {
        cognitoUser.forgotPassword({
          onSuccess: (data) => {
            // successfully initiated reset password request
            setUser(cognitoUser)
            setStatus(AccountStatus.NewPasswordRequired)
            resolve(true)
          },
          onFailure: (err: Error) => {
            setError({ ...(err as AWSError) })
            resolve(false)
          },
        })
      } else {
        resolve(false)
      }
    })
  }

  const login = (email: string, password: string) => {
    // login into cognito using aws sdk
    const authenticationData = {
      Username: email,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)

    setError(null)
    return new Promise((resolve) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          // const accessToken = result.getAccessToken().getJwtToken()
          // console.log('accessToken', accessToken)
          // POTENTIAL: Region needs to be set if not already set previously elsewhere.
          AWS.config.region = process.env.NEXT_PUBLIC_AWS_REGION

          const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID || '',
            Logins: {
              // Change the key below according to the specific region your user pool is in.
              [`cognito-idp.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`]:
                result.getIdToken().getJwtToken(),
            },
          })
          AWS.config.credentials = credentials

          // refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
          credentials.refresh((err?: AWSError) => {
            if (err) {
              setError(err)
            } else {
              console.log('Successfully logged!')
            }
          })

          setUser(cognitoUser)
          resolve(true)
        },

        onFailure(err: AWSError) {
          setError({ ...err })
          resolve(false)
        },

        newPasswordRequired: (userAttributes, requiredAttributes) => {
          console.log('newPasswordRequired', userAttributes, requiredAttributes)
          resolve(false)
        },
        mfaRequired: (challengeName, challengeParameters) => {
          console.log('mfaRequired', challengeName, challengeParameters)
          resolve(false)
        },
        totpRequired: (challengeName, challengeParameters) => {
          console.log('totpRequired', challengeName, challengeParameters)
          resolve(false)
        },
        customChallenge: (challengeParameters) => {
          const challengeName = 'challenge-answer'
          console.log('customChallenge', challengeName, challengeParameters)
          resolve(false)
        },
        mfaSetup: (challengeName, challengeParameters) => {
          console.log('mfaSetup', challengeName, challengeParameters)
          resolve(false)
        },
        selectMFAType: (challengeName, challengeParameters) => {
          console.log('selectmfatype', challengeName, challengeParameters)
          resolve(false)
        },
      })
    })
  }

  return { login, logout, user, error, forgotPassword, confirmPassword, status }
}
