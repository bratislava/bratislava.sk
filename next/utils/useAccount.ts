import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  IAuthenticationDetailsData,
} from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'
import { AWSError } from 'aws-sdk/global'
import { useEffect, useState } from 'react'

export enum AccountStatus {
  Idle,
  NewPasswordRequired,
  NewPasswordSuccess,
  EmailVerificationRequired,
  EmailVerificationSuccess,
  IdentityVerificationRequired,
  IdentityVerificationSuccess,
}

export enum Tier {
  IdentityCard = 'IDENTITY_CARD',
}

export interface Address {
  formatted?: string
  street_address?: string
  locality?: string
  region?: string
  postal_code?: string
  country?: string
  phone_number?: string
}

export interface UserData {
  sub?: string
  email_verified?: string
  email?: string
  name?: string
  given_name?: string
  family_name?: string
  phone_number?: string
  phone_verified?: string
  address?: Address
  ifo?: string
  tier?: Tier
}

// non standard, has prefix custom: in cognito
const customAttributes = new Set(['ifo', 'tier'])
const updatableAttributes = new Set([
  'name',
  'given_name',
  'family_name',
  'phone_number',
  'address',
])

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
}
const userPool = new CognitoUserPool(poolData)

export interface AccountError {
  message: string
  code: string
}

let accessToken: string | undefined
export default function useAccount(initStatus = AccountStatus.Idle) {
  const [user, setUser] = useState<CognitoUser | null | undefined>()
  const [error, setError] = useState<AccountError | undefined | null>(null)
  const [status, setStatus] = useState<AccountStatus>(initStatus)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [temporaryUserData, setTemporaryUserData] = useState<UserData | null>(null)
  const [lastCredentials, setLastCredentials] = useState<IAuthenticationDetailsData>({
    Username: '',
  })

  useEffect(() => {
    const updatedUserData = userData ? { ...userData } : null
    setTemporaryUserData(updatedUserData)
  }, [userData])

  const resetTemporaryUserData = () => {
    const actualUserData = userData ? { ...userData } : null
    setTemporaryUserData(actualUserData)
  }

  const userAttributesToObject = (attributes?: CognitoUserAttribute[]): UserData => {
    const data: any = {}
    attributes?.forEach((attribute: CognitoUserAttribute) => {
      const attributeKey: string = attribute.getName().replace(/^custom:/, '')
      data[attributeKey] =
        attributeKey === 'address' ? JSON.parse(attribute.getValue()) : attribute.getValue()
    })
    return data
  }

  const objectToUserAttributes = (data: UserData | Address): CognitoUserAttribute[] => {
    const attributeList: CognitoUserAttribute[] = []
    Object.entries(data).forEach(([key, value]) => {
      if (updatableAttributes.has(key)) {
        const attribute = new CognitoUserAttribute({
          Name: customAttributes.has(key) ? `custom:${key}` : key,
          Value: key === 'address' ? JSON.stringify(value) : value,
        })
        attributeList.push(attribute)
      }
    })
    return attributeList
  }

  const verifyEmail = (verificationCode: string): Promise<boolean> => {
    const cognitoUser = new CognitoUser({
      Username: lastCredentials?.Username,
      Pool: userPool,
    })

    return new Promise((resolve) => {
      cognitoUser.confirmRegistration(verificationCode, true, async (err?: AWSError) => {
        if (err) {
          setError({ ...err })
          resolve(false)
        } else {
          setStatus(AccountStatus.EmailVerificationSuccess)
          resolve(await login(lastCredentials.Username, lastCredentials.Password))
        }
      })
    })
  }

  const resendVerificationCode = (): Promise<boolean> => {
    const cognitoUser = new CognitoUser({
      Username: lastCredentials.Username,
      Pool: userPool,
    })

    setError(null)
    return new Promise((resolve) => {
      cognitoUser.resendConfirmationCode((err?: Error) => {
        if (err) {
          setError({ ...(err as AWSError) })
          resolve(false)
        } else {
          resolve(true)
        }
      })
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
            setError(null)
            resolve(true)
          }
        })
      } else {
        resolve(false)
      }
    })
  }

  const verifyIdentity = async (rc: string, idCard: string): Promise<boolean> => {
    try {
      await verifyIdentityApi({ birthNumber: rc, identityCard: idCard }, accessToken)
      setStatus(AccountStatus.IdentityVerificationSuccess)
      return true
    } catch (error: any) {
      setError({
        code: error.message,
        message: error.message,
      })
      return false
    }
  }

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser != null) {
      cognitoUser.getSession((err: Error | null, result: CognitoUserSession | null) => {
        if (err) {
          console.error(err)
          return
        }

        accessToken = result?.getAccessToken().getJwtToken()
        // NOTE: getSession must be called to authenticate user before calling getUserAttributes
        cognitoUser.getUserAttributes((err?: Error, attributes?: CognitoUserAttribute[]) => {
          if (err) {
            console.error(err)
            return
          }

          const userData = userAttributesToObject(attributes)
          setStatus(
            userData.tier !== Tier.IdentityCard
              ? AccountStatus.IdentityVerificationRequired
              : AccountStatus.IdentityVerificationSuccess,
          )
          setUserData(userData)
          setUser(cognitoUser)
        })
      })
    } else {
      setUser(null)
    }
  }, [])

  const logout = () => {
    if (user) {
      user.signOut()
      setUser(null)
      setUserData(null)
    }
  }

  const signUp = (email: string, password: string, data: UserData): Promise<boolean> => {
    const attributeList = objectToUserAttributes(data)

    setLastCredentials({ Username: email, Password: password })
    setError(null)
    return new Promise((resolve) => {
      userPool.signUp(email, password, attributeList, [], (err?: Error) => {
        if (err) {
          setError({ ...(err as AWSError) })
          resolve(false)
        } else {
          setStatus(AccountStatus.EmailVerificationRequired)
          resolve(true)
        }
      })
    })
  }

  const changePassword = (oldPassword: string, newPassword: string): Promise<boolean> => {
    setError(null)
    return new Promise((resolve) => {
      if (user) {
        user.changePassword(oldPassword, newPassword, (err?: Error) => {
          if (err) {
            const customErr = { ...(err as AWSError) }
            if (customErr.code === 'NotAuthorizedException') {
              customErr.code = 'IncorectPasswordException'
              customErr.name = 'IncorectPasswordException'
            }
            setError(customErr)
            resolve(false)
          } else {
            setStatus(AccountStatus.NewPasswordSuccess)
            resolve(true)
          }
        })
      } else {
        resolve(false)
      }
    })
  }

  const confirmPassword = (verificationCode: string, password: string) => {
    const cognitoUser = new CognitoUser({
      Username: lastCredentials.Username,
      Pool: userPool,
    })

    return new Promise((resolve) => {
      cognitoUser.confirmPassword(verificationCode, password, {
        async onSuccess() {
          setStatus(AccountStatus.NewPasswordSuccess)
          resolve(await login(lastCredentials.Username, password))
        },
        onFailure(err: Error) {
          setError({ ...(err as AWSError) })
          resolve(false)
        },
      })
    })
  }

  const forgotPassword = (email = ''): Promise<boolean> => {
    const cognitoUser = new CognitoUser({
      Username: email || lastCredentials.Username,
      Pool: userPool,
    })

    if (email) {
      setLastCredentials({ Username: email })
    }
    setError(null)
    return new Promise((resolve) => {
      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          console.log(data)
          // successfully initiated reset password request
          setStatus(AccountStatus.NewPasswordRequired)
          resolve(true)
        },
        onFailure: (err: Error) => {
          setError({ ...(err as AWSError) })
          resolve(false)
        },
      })
    })
  }

  const login = (email: string, password: string | undefined): Promise<boolean> => {
    // login into cognito using aws sdk
    const credentials = {
      Username: email,
      Password: password,
    }

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    })

    setLastCredentials(credentials)
    setError(null)
    return new Promise((resolve) => {
      cognitoUser.authenticateUser(new AuthenticationDetails(credentials), {
        onSuccess(result: CognitoUserSession) {
          // POTENTIAL: Region needs to be set if not already set previously elsewhere.
          AWS.config.region = process.env.NEXT_PUBLIC_AWS_REGION

          const awsCredentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID || '',
            Logins: {
              // Change the key below according to the specific region your user pool is in.
              [`cognito-idp.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}`]:
                result.getIdToken().getJwtToken(),
            },
          })
          AWS.config.credentials = awsCredentials

          // refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
          awsCredentials.refresh((err?: AWSError) => {
            if (err) {
              setError(err)
              resolve(false)
            } else {
              setUser(cognitoUser)
              resolve(true)
            }
          })
        },

        onFailure(err: AWSError) {
          if (err.code === 'UserNotConfirmedException') {
            setStatus(AccountStatus.EmailVerificationRequired)
          } else {
            setError({ ...err })
          }
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
    temporaryUserData,
    resetTemporaryUserData,
    setTemporaryUserData,
    signUp,
    verifyEmail,
    resendVerificationCode,
    verifyIdentity,
    changePassword,
    lastEmail: lastCredentials.Username,
    isAuth: user !== null,
  }
}
