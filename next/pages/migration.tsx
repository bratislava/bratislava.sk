import { AsyncServerProps } from '@utils/types'
import useAccount, { AccountStatus } from '@utils/useAccount'
import AccountContainer from 'components/forms/segments/AccountContainer/AccountContainer'
import AccountSuccessAlert from 'components/forms/segments/AccountSuccessAlert/AccountSuccessAlert'
import MigrationForm from 'components/forms/segments/MigrationForm/MigrationForm'
import NewPasswordForm from 'components/forms/segments/NewPasswordForm/NewPasswordForm'
import LoginRegisterLayout from 'components/layouts/LoginRegisterLayout'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
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

const MigrationPage = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  const { confirmPassword, forgotPassword, error, status, lastEmail } = useAccount()
  const { t } = useTranslation('account')
  const router = useRouter()

  const onConfirm = () => {
    router.push('/')
  }

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <LoginRegisterLayout>
        <AccountContainer>
          {status === AccountStatus.NewPasswordRequired ? (
            <NewPasswordForm
              onSubmit={confirmPassword}
              onResend={forgotPassword}
              error={error}
              lastEmail={lastEmail}
            />
          ) : status === AccountStatus.NewPasswordSuccess ? (
            <AccountSuccessAlert
              title={t('migration_success_title')}
              confirmLabel={t('account_continue_link')}
              onConfirm={onConfirm}
            />
          ) : (
            <MigrationForm onSubmit={forgotPassword} error={error} />
          )}
        </AccountContainer>
      </LoginRegisterLayout>
    </PageWrapper>
  )
}

export default MigrationPage
