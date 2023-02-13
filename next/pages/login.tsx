import { AsyncServerProps } from '@utils/types'
import useAccount, { AccountStatus } from '@utils/useAccount'
import AccountContainer from 'components/forms/segments/AccountContainer/AccountContainer'
import CompleteNewPasswordForm from 'components/forms/segments/CompleteNewPasswordForm/CompleteNewPasswordForm'
import EmailVerificationForm from 'components/forms/segments/EmailVerificationForm/EmailVerificationForm'
import LoginForm from 'components/forms/segments/LoginForm/LoginForm'
import LoginRegisterLayout from 'components/layouts/LoginRegisterLayout'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

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

const LoginPage = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  const {
    login,
    error,
    status,
    resendVerificationCode,
    verifyEmail,
    lastEmail,
    completeNewPassword,
  } = useAccount()
  const router = useRouter()

  const redirect = () => {
    const from =
      router.query.from &&
      typeof router.query.from === 'string' &&
      router.query.from.startsWith('/')
        ? decodeURIComponent(router.query.from)
        : '/'
    router.push(from)
  }

  const onLogin = async (email: string, password: string) => {
    if (await login(email, password)) {
      redirect()
    }
  }

  const onVerifyEmail = async (verificationCode: string) => {
    if (await verifyEmail(verificationCode)) {
      redirect()
    }
  }

  const onNewPassword = async (password: string) => {
    if (await completeNewPassword(password)) {
      redirect()
    }
  }

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <LoginRegisterLayout>
        <AccountContainer>
          {status === AccountStatus.EmailVerificationRequired ? (
            <EmailVerificationForm
              lastEmail={lastEmail}
              onResend={resendVerificationCode}
              onSubmit={onVerifyEmail}
              error={error}
            />
          ) : status === AccountStatus.NewPasswordRequired ? (
            <CompleteNewPasswordForm onSubmit={onNewPassword} error={error} />
          ) : (
            <LoginForm onSubmit={onLogin} error={error} />
          )}
        </AccountContainer>
      </LoginRegisterLayout>
    </PageWrapper>
  )
}

export default LoginPage
