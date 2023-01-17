import { AsyncServerProps } from '@utils/types'
import useAccount, { AccountStatus, UserData } from '@utils/useAccount'
import AccountContainer from 'components/forms/segments/AccountContainer/AccountContainer'
import EmailVerificationForm from 'components/forms/segments/EmailVerificationForm/EmailVerificationForm'
import RegisterForm from 'components/forms/segments/RegisterForm/RegisterForm'
import LoginRegisterLayout from 'components/layouts/LoginRegisterLayout'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'

import PageWrapper from '../components/layouts/PageWrapper'
import { isProductionDeployment } from '../utils/utils'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (isProductionDeployment()) return { notFound: true }

  const locale = ctx.locale ?? 'sk'

  return {
    props: {
      page: {
        locale: ctx.locale,
        localizations: ['sk', 'en']
          .filter((l) => l !== ctx.locale)
          .map((l) => ({
            slug: '',
            locale: l,
          })),
      },
      ...(await serverSideTranslations(locale)),
    },
  }
}

const RegisterPage = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  const [lastEmail, setLastEmail] = useState<string>()
  const { signUp, resendVerificationCode, verify, error, status } = useAccount()

  const onSignUp = (email: string, password: string, data: UserData): Promise<boolean> => {
    setLastEmail(email)
    return signUp(email, password, data)
  }
  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <LoginRegisterLayout>
        <AccountContainer>
          {status === AccountStatus.Idle && (
            <RegisterForm lastEmail={lastEmail} onSubmit={onSignUp} error={error} />
          )}
          {status === AccountStatus.VerificationRequired && (
            <EmailVerificationForm
              onResend={resendVerificationCode}
              onSubmit={verify}
              error={error}
            />
          )}
        </AccountContainer>
      </LoginRegisterLayout>
    </PageWrapper>
  )
}

export default RegisterPage
