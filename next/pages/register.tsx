import { ROUTES } from '@utils/constants'
import { formatUnicorn } from '@utils/string'
import { AsyncServerProps } from '@utils/types'
import useAccount, { AccountStatus } from '@utils/useAccount'
import AccountContainer from 'components/forms/segments/AccountContainer/AccountContainer'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import AccountSuccessAlert from 'components/forms/segments/AccountSuccessAlert/AccountSuccessAlert'
import EmailVerificationForm from 'components/forms/segments/EmailVerificationForm/EmailVerificationForm'
import IdentityVerificationForm from 'components/forms/segments/IdentityVerificationForm/IdentityVerificationForm'
import RegisterForm from 'components/forms/segments/RegisterForm/RegisterForm'
import LoginRegisterLayout from 'components/layouts/LoginRegisterLayout'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
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
  const { t } = useTranslation('account')
  const [lastRc, setLastRc] = useState('')
  const [lastIdCard, setLastIdCard] = useState('')
  const {
    signUp,
    resendVerificationCode,
    verifyEmail,
    error,
    status,
    setStatus,
    verifyIdentity,
    lastEmail,
  } = useAccount()
  const router = useRouter()

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <LoginRegisterLayout
        backButtonHidden={[
          AccountStatus.EmailVerificationSuccess,
          AccountStatus.IdentityVerificationRequired,
          AccountStatus.IdentityVerificationSuccess,
        ].includes(status)}
      >
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
              onCancel={() =>
                router.push({ pathname: ROUTES.ACCOUNT, query: { from: ROUTES.REGISTER } })
              }
            >
              <AccountMarkdown
                className="text-center"
                content={t('register_success_content')}
                variant="sm"
              />
            </AccountSuccessAlert>
          )}
          {status === AccountStatus.IdentityVerificationRequired && (
            <IdentityVerificationForm
              onSubmit={(rc, idCard) => {
                setLastRc(rc)
                setLastIdCard(idCard)
                return verifyIdentity(rc, idCard)
              }}
              error={error}
            />
          )}
          {status === AccountStatus.IdentityVerificationSuccess && (
            <AccountSuccessAlert
              title={t('identity_verification_success_title')}
              description={
                lastRc &&
                lastIdCard &&
                formatUnicorn(t('identity_verification_success_description'), {
                  rc: lastRc,
                  idCard: lastIdCard,
                })
              }
              confirmLabel={t('account_continue_link')}
              onConfirm={() =>
                router.push({ pathname: ROUTES.ACCOUNT, query: { from: ROUTES.REGISTER } })
              }
            />
          )}
        </AccountContainer>
      </LoginRegisterLayout>
    </PageWrapper>
  )
}

export default RegisterPage
