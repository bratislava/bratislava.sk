import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ISignUpResult,
} from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'
import { AWSError } from 'aws-sdk/global'
import { useEffect, useState } from 'react'

export enum AccountStatus {
  Idle,
  NewPasswordRequired,
  VerificationRequired,
  Success,
}

export interface UserData {
  sub?: string
  email_verified?: string
  email?: string
  given_name?: string
  family_name?: string
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
  const [userData, setUserData] = useState<UserData | null>(null)

  const setAttributes = (attributes?: CognitoUserAttribute[]) => {
    if (attributes) {
      const data: any = {}
      attributes.forEach((attribute: CognitoUserAttribute) => {
        data[attribute.getName()] = attribute.getValue()
      })
      setUserData(data)
    }
  }

  useEffect(() => {
    const currentUser = userPool.getCurrentUser()
    if (currentUser != null) {
      currentUser.getSession((err: Error) => {
        if (err) {
          console.error(err)
          return
        }
        // NOTE: getSession must be called to authenticate user before calling getUserAttributes
        currentUser.getUserAttributes((err?: Error, attributes?: CognitoUserAttribute[]) => {
          if (err) {
            console.error(err)
          } else {
            setAttributes(attributes)
            setUser(currentUser)
          }
        })
      })
    }
  }, [])

  const logout = () => {
    if (user) {
      user.signOut()
      setUser(null)
    }
  }

  const signUp = (email: string, password: string, data: UserData) => {
    const attributeList: CognitoUserAttribute[] = []
    Object.keys(data).forEach((key: string) => {
      const attribute = new CognitoUserAttribute({
        Name: key,
        Value: data[key].toString(),
      })
      attributeList.push(attribute)
    })

    setError(null)
    return new Promise((resolve) => {
      userPool.signUp(email, password, attributeList, [], (err: Error, result: ISignUpResult) => {
        if (err) {
          console.error(err.message)
          setError({ ...(err as AWSError) })
          resolve(false)
        } else {
          setUser(result.user)
          setStatus(AccountStatus.VerificationRequired)
          resolve(true)
        }
      })
    })
  }

  const confirmPassword = (verificationCode: string, password: string) => {
    return new Promise((resolve) => {
      if (user) {
        user.confirmPassword(verificationCode, password, {
          onSuccess() {
            console.log('Password confirmed!')
            setStatus(AccountStatus.Success)
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
            console.log(data)
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

          cognitoUser.getUserAttributes((err?: Error, attributes?: CognitoUserAttribute[]) => {
            if (err) {
              setError({ ...(err as AWSError) })
              resolve(false)
            } else {
              setAttributes(attributes)
              setUser(cognitoUser)
              resolve(true)
            }
          })
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

  return { login, logout, user, error, forgotPassword, confirmPassword, status, userData, signUp }
}
