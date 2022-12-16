// this is non-production code, much of it is copied from https://www.npmjs.com/package/amazon-cognito-identity-js
// disabling eslint/ts checks instead of fixing them
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */
// @ts-nocheck
import { AsyncServerProps } from '@utils/types'
import { isProductionDeployment } from '@utils/utils'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js'
import * as AWS from 'aws-sdk/global'
import Button from 'components/forms/simple-components/Button'
import InputField from 'components/forms/widget-components/InputField/InputField'
import PageWrapper from 'components/layouts/PageWrapper'
import { Wrapper } from 'components/styleguide/Wrapper'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'

const TEST_USER_POOL_ID = 'eu-central-1_FZDV0j2ZK'
const TEST_CLIENT_ID = '1pdeai19927kshpgikd6l1ptc6'
const TEST_IDENTITY_POOL_ID = 'eu-central-1:e31a6d0a-5e01-4600-a20a-e4fb973d3893'
const poolData = {
  UserPoolId: TEST_USER_POOL_ID, // Your user pool id here
  ClientId: TEST_CLIENT_ID, // Your client id here
}
const userPool = new CognitoUserPool(poolData)

// AWS.config.region = 'eu-central-1'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//    IdentityPoolId: 'eu-central-1:e31a6d0a-5e01-4600-a20a-e4fb973d3893',
// });

const CognitoPrototype = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  const [email, setEmail] = useState('mpinter.pinto+1@gmail.com')
  const [password, setPassword] = useState('Password1!')
  const [emailOtp, setEmailOtp] = useState('')
  const [loginEmail, setLoginEmail] = useState('mpinter.pinto+1@gmail.com')
  const [loginPassword, setLoginPassword] = useState('Password1!')
  const [phone, setPhone] = useState('')
  const [cognitoUser, setCognitoUser] = useState(null)
  const [serializedUserData, setSerializedUserData] = useState('')

  const createUser = () => {
    const attributeList = []

    const dataEmail = {
      Name: 'email',
      Value: email,
    }

    // var dataPhoneNumber = {
    //   Name: 'phone_number',
    //   Value: '+15555555555',
    // }
    const attributeEmail = new CognitoUserAttribute(dataEmail)
    // var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber)

    attributeList.push(attributeEmail)
    // attributeList.push(attributePhoneNumber)

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      const cognitoUser = result.user
      alert(`user name is ${cognitoUser.getUsername()}`)
      console.log(`user name is ${cognitoUser.getUsername()}`)
    })
  }

  const validateEmail = () => {
    const userData = {
      Username: email,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)
    cognitoUser.confirmRegistration(emailOtp, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      alert(`call result: ${result}`)
      console.log(`call result: ${result}`)
    })
  }

  const resendEmail = () => {
    const userData = {
      Username: email,
      Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err))
        return
      }
      alert(`call result: ${result}`)
      console.log(`call result: ${result}`)
    })
  }

  const login = () => {
    // login into cognito using aws sdk
    const authenticationData = {
      Username: loginEmail,
      Password: loginPassword,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    const userData = {
      Username: loginEmail,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        const accessToken = result.getAccessToken().getJwtToken()
        console.log('accessToken', accessToken)
        // POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = 'eu-central-1'

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: TEST_IDENTITY_POOL_ID,
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            [`cognito-idp.eu-central-1.amazonaws.com/${TEST_USER_POOL_ID}`]: result
              .getIdToken()
              .getJwtToken(),
          },
        })

        // refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        AWS.config.credentials.refresh((error) => {
          if (error) {
            console.error(error)
          } else {
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
            console.log('Successfully logged!')
          }
        })

        setCognitoUser(cognitoUser)
      },

      onFailure(err) {
        alert(err.message || JSON.stringify(err))
        console.log(err)
      },

      newPasswordRequired: (userAttributes, requiredAttributes) => {
        alert('newPasswordRequired', userAttributes, requiredAttributes)
        console.log('newPasswordRequired', userAttributes, requiredAttributes)
      },
      mfaRequired: (challengeName, challengeParameters) => {
        alert(`mfaRequired, ${challengeName}, ${challengeParameters}`)
        console.log('mfaRequired', challengeName, challengeParameters)
      },
      totpRequired: (challengeName, challengeParameters) => {
        alert(`totpRequired, ${challengeName}, ${challengeParameters}`)
        console.log('totpRequired', challengeName, challengeParameters)
      },
      customChallenge: (challengeParameters) => {
        alert(`customChallenge, ${challengeName}, ${challengeParameters}`)
        console.log('customChallenge', challengeName, challengeParameters)
      },
      mfaSetup: (challengeName, challengeParameters) => {
        alert(`mfaSetup, ${challengeName}, ${challengeParameters}`)
        console.log('mfaSetup', challengeName, challengeParameters)
      },
      selectMFAType: (challengeName, challengeParameters) => {
        alert(`selectmfatype, ${challengeName}, ${challengeParameters}`)
        console.log('selectmfatype', challengeName, challengeParameters)
      },
    })
  }

  // useEffect that updates on cognitoUser change and maps all the attributes into json
  useEffect(() => {
    if (cognitoUser) {
      cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err))
          return
        }
        const obj = {}
        for (const element of result) {
          obj[element.getName()] = element.getValue()
        }
        // JSON stringify pretty print obj
        setSerializedUserData(JSON.stringify(obj, null, 2))
        console.log('obj', obj)
      })
    } else {
      setSerializedUserData('')
    }
  }, [cognitoUser])

  // logout cognitoUser
  const logout = () => {
    if (cognitoUser) {
      cognitoUser.signOut()
      setCognitoUser(null)
    }
  }

  // updates the phone attribute in cognitoUser
  const updateCognitoPhone = () => {
    if (cognitoUser) {
      cognitoUser.updateAttributes(
        [
          {
            Name: 'phone_number',
            Value: phone,
          },
        ],
        (err, result) => {
          if (err) {
            alert(err.message || JSON.stringify(err))
            return
          }
          alert(`call result: ${result}`)
          console.log(`call result: ${result}`)
        },
      )
    }
  }

  // verify phone number otp
  const validatePhone = () => {
    if (cognitoUser) {
      cognitoUser.getAttributeVerificationCode('phone_number', {
        onSuccess(result) {
          console.log(`call result: ${result}`)
        },
        onFailure(err) {
          alert(err.message || JSON.stringify(err))
        },
        inputVerificationCode() {
          const verificationCode = prompt('Please input verification code: ', '')
          cognitoUser.verifyAttribute('phone_number', verificationCode, this)
        },
      })
    }
  }

  return (
    <PageWrapper locale={page.locale}>
      <div className="font-inter min-h-screen bg-[#E5E5E5]">
        <div className="mx-auto max-w-screen-lg md:px-12 md:pt-12 pb-64">
          <div>Cognito integration prototype</div>
          <div>
            Note - the broken behaviour of inputs related to the component itself and not to this
            integration, will be resolved soon.
          </div>
          <Wrapper direction="column" title="Create user">
            <InputField onChange={setEmail} value={email} label="Email" placeholder="Email" />
            <InputField
              onChange={setPassword}
              value={password}
              label="Password"
              placeholder="Password"
            />
            <Button onPress={createUser} text="1. Create user & send verification code to email" />
          </Wrapper>
          <Wrapper
            direction="column"
            title="2. Confirm or resend code - uses the email in input above"
          >
            <InputField
              onChange={setEmailOtp}
              value={emailOtp}
              label="EmailOTP"
              placeholder="EmailOTP"
            />
            <Button onPress={validateEmail} text="Validate Email" />
            <Button onPress={resendEmail} text="Resend Email" />
          </Wrapper>
          <Wrapper direction="column" title="3. Login">
            <InputField
              onChange={setLoginEmail}
              value={loginEmail}
              label="Email"
              placeholder="Email"
            />
            <InputField
              onChange={setLoginPassword}
              value={loginPassword}
              label="Password"
              placeholder="Password"
            />
            <Button onPress={login} text="Login" />
          </Wrapper>
          <Wrapper direction="column" title="Currently logged in user data & logout">
            {serializedUserData}
            {cognitoUser && <Button onPress={logout} text="Logout" />}
          </Wrapper>
          <Wrapper direction="column" title="4. Add phone number">
            <InputField onChange={setPhone} value={phone} label="Phone" placeholder="Phone" />
            <Button onPress={updateCognitoPhone} text="Update Phone" />
          </Wrapper>
          <Wrapper direction="column" title="5. Confirm or resend phone otp">
            <Button onPress={validatePhone} text="Validate Phone with OTP" />
          </Wrapper>
        </div>
      </div>
    </PageWrapper>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  return {
    props: {
      page: {
        locale: ctx.locale,
      },
      ...(await serverSideTranslations(locale)),
    },
  }
}

export default CognitoPrototype
