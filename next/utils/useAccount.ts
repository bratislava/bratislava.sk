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
  EmailVerificationRequired,
  EmailVerificationSuccess,
  IdentityVerificationRequired,
  SignedIn,
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

export default function useAccount(initStatus = AccountStatus.Idle) {
  const [user, setUser] = useState<CognitoUser | null>(null)
  const [error, setError] = useState<AWSError | undefined | null>(null)
  const [status, setStatus] = useState<AccountStatus>(initStatus)
  const [userData, setUserData] = useState<UserData | null>(null)

  const userAttributesToObject = (attributes?: CognitoUserAttribute[]): UserData => {
    const data: any = {}
    attributes?.forEach((attribute: CognitoUserAttribute) => {
      data[attribute.getName()] = attribute.getValue()
    })
    return data
  }

  const objectToUserAttributes = (data: UserData): CognitoUserAttribute[] => {
    const attributeList: CognitoUserAttribute[] = []
    Object.entries(data).forEach(([key, value]) => {
      const attribute = new CognitoUserAttribute({
        Name: key,
        Value: value,
      })
      attributeList.push(attribute)
    })
    return attributeList
  }

  const verify = (verificationCode: string): Promise<boolean> => {
    setError(null)
    return new Promise((resolve) => {
      if (user) {
        user.confirmRegistration(verificationCode, true, (err?: AWSError) => {
          if (err) {
            setError({ ...err })
            resolve(false)
          } else {
            setStatus(AccountStatus.EmailVerificationSuccess)
            resolve(true)
          }
        })
      } else {
        resolve(false)
      }
    })
  }

  const resendVerificationCode = (): Promise<boolean> => {
    setError(null)
    return new Promise((resolve) => {
      if (user) {
        user.resendConfirmationCode((err?: Error, res?: string) => {
          if (err) {
            setError({ ...(err as AWSError) })
            resolve(false)
          } else {
            console.log(res)
            resolve(true)
          }
        })
      } else {
        resolve(false)
      }
    })
  }

  const updateUserData = (data: UserData): Promise<boolean> => {
    const attributeList = objectToUserAttributes(data)

    setError(null)
    return new Promise((resolve) => {
      if (user) {
        user.updateAttributes(attributeList, (err?: Error) => {
          if (err) {
            setError({ ...(err as AWSError) })
            resolve(false)
          } else {
            setUserData((state) => ({ ...state, ...data }))
            resolve(true)
          }
        })
      } else {
        resolve(false)
      }
    })
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
            return
          }

          setUserData(userAttributesToObject(attributes))
          setStatus(AccountStatus.SignedIn)
          setUser(currentUser)
        })
      })
    }
  }, [])

  const logout = () => {
    if (user) {
      user.signOut()
      setUser(null)
      setUserData(null)
      setStatus(AccountStatus.Idle)
    }
  }

  const signUp = (email: string, password: string, data: UserData): Promise<boolean> => {
    const attributeList = objectToUserAttributes(data)

    setError(null)
    return new Promise((resolve) => {
      userPool.signUp(email, password, attributeList, [], (err?: Error, result?: ISignUpResult) => {
        if (err) {
          console.error(err.message)
          setError({ ...(err as AWSError) })
          resolve(false)
        } else if (result) {
          setUser(result.user)
          setStatus(AccountStatus.EmailVerificationRequired)
          resolve(true)
        } else {
          resolve(false)
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

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    })

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
              resolve(false)
            } else {
              cognitoUser.getUserAttributes((err?: Error, attributes?: CognitoUserAttribute[]) => {
                if (err) {
                  setError({ ...(err as AWSError) })
                  resolve(false)
                } else {
                  setUserData(userAttributesToObject(attributes))
                  setStatus(AccountStatus.SignedIn)
                  setUser(cognitoUser)
                  resolve(true)
                }
              })
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

  return {
    login,
    logout,
    user,
    error,
    forgotPassword,
    confirmPassword,
    status,
    setStatus,
    userData,
    updateUserData,
    signUp,
    verify,
    resendVerificationCode,
  }
}
