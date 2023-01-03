import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'
import { AWSError } from 'aws-sdk/global'
import { useEffect, useState } from 'react'

const TEST_USER_POOL_ID = 'eu-central-1_FZDV0j2ZK'
const TEST_CLIENT_ID = '1pdeai19927kshpgikd6l1ptc6'
const TEST_IDENTITY_POOL_ID = 'eu-central-1:e31a6d0a-5e01-4600-a20a-e4fb973d3893'
const poolData = {
  UserPoolId: TEST_USER_POOL_ID, // Your user pool id here
  ClientId: TEST_CLIENT_ID, // Your client id here
}
const userPool = new CognitoUserPool(poolData)

export default function useAccount() {
  const [user, setUser] = useState<CognitoUser>(null)
  const [error, setError] = useState<AWSError>(null)

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

  const login = ({ email, password }) => {
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
          AWS.config.region = 'eu-central-1'

          const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: TEST_IDENTITY_POOL_ID,
            Logins: {
              // Change the key below according to the specific region your user pool is in.
              [`cognito-idp.eu-central-1.amazonaws.com/${TEST_USER_POOL_ID}`]: result
                .getIdToken()
                .getJwtToken(),
            },
          })
          AWS.config.credentials = credentials

          // refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
          credentials.refresh((err: AWSError) => {
            if (err) {
              setError(err)
            } else {
              console.log('Successfully logged!')
            }
          })

          setUser(cognitoUser)
          console.log(cognitoUser)
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

  return { login, logout, user, error }
}
