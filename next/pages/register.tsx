import { formatUnicorn } from '@utils/string'
import { AsyncServerProps } from '@utils/types'
import useAccount, { AccountStatus } from '@utils/useAccount'
import AccountContainer from 'components/forms/segments/AccountContainer/AccountContainer'
import AccountSuccessAlert from 'components/forms/segments/AccountSuccessAlert/AccountSuccessAlert'
import EmailVerificationForm from 'components/forms/segments/EmailVerificationForm/EmailVerificationForm'
import IdentityVerificationForm from 'components/forms/segments/IdentityVerificationForm/IdentityVerificationForm'
import RegisterForm from 'components/forms/segments/RegisterForm/RegisterForm'
import LoginRegisterLayout from 'components/layouts/LoginRegisterLayout'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

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
  const { t } = useTranslation('account')
  const { signUp, resendVerificationCode, verifyEmail, error, status, setStatus, lastEmail } =
    useAccount()
  const router = useRouter()

  const onVerifyIdentity = (rc: string, idCard: string) => {
    setStatus(AccountStatus.IdentityVerificationSuccess)
  }

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <LoginRegisterLayout>
        <AccountContainer>
          {status === AccountStatus.Idle && (
            <RegisterForm lastEmail={lastEmail} onSubmit={signUp} error={error} />
          )}
          {status === AccountStatus.EmailVerificationRequired && (
            <EmailVerificationForm
              lastEmail={lastEmail}
              onResend={resendVerificationCode}
              onSubmit={verifyEmail}
              error={error}
            />
          )}
          {status === AccountStatus.EmailVerificationSuccess && (
            <AccountSuccessAlert
              title={t('register_success_title')}
              description={formatUnicorn(t('register_success_description'), {
                email: lastEmail,
              })}
              confirmLabel={t('identity_verification_link')}
              onConfirm={() => setStatus(AccountStatus.IdentityVerificationRequired)}
              cancelLabel={t('identity_verification_skip')}
              onCancel={() => router.push('/')}
            >
              <ReactMarkdown className="text-center">{t('register_success_content')}</ReactMarkdown>
            </AccountSuccessAlert>
          )}
          {status === AccountStatus.IdentityVerificationRequired && (
            <IdentityVerificationForm onSubmit={onVerifyIdentity} error={error} />
          )}
          {status === AccountStatus.IdentityVerificationSuccess && (
            <AccountSuccessAlert
              title={t('identity_verification_success_title')}
              description={formatUnicorn(t('identity_verification_success_description'), {})}
              confirmLabel={t('account_link')}
              onConfirm={() => router.push('/')}
            />
          )}
        </AccountContainer>
      </LoginRegisterLayout>
    </PageWrapper>
  )
}

export default RegisterPage
