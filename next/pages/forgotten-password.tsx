import AccountContainer from '@bratislava/ui-bratislava/AccountContainer/AccountContainer'
import ForgottenPasswordForm from '@bratislava/ui-bratislava/ForgottenPasswordForm/ForgottenPasswordForm'
import NewPasswordForm from '@bratislava/ui-bratislava/NewPasswordForm/NewPasswordForm'
import SuccessAlert from '@bratislava/ui-bratislava/SuccessAlert/SuccessAlert'
import { AsyncServerProps } from '@utils/types'
import useAccount, { AccountStatus } from '@utils/useAccount'
import AccountPageLayout from 'components/layouts/AccountPageLayout'
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

const ForgottenPasswordPage = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  const { confirmPassword, forgotPassword, error, status } = useAccount()
  const { t } = useTranslation('account')
  const router = useRouter()

  const onConfirm = () => {
    router.push('/')
  }

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <AccountPageLayout>
        <AccountContainer>
          {status === AccountStatus.Success && (
            <ForgottenPasswordForm onSubmit={forgotPassword} error={error} />
          )}
          {status === AccountStatus.NewPasswordRequired && (
            <NewPasswordForm onSubmit={confirmPassword} onResend={forgotPassword} error={error} />
          )}
          {status === AccountStatus.Idle && (
            <SuccessAlert
              title={t('forgotten_password_success_title')}
              confirmLabel={t('account_link')}
              onConfirm={onConfirm}
            />
          )}
        </AccountContainer>
      </AccountPageLayout>
    </PageWrapper>
  )
}

export default ForgottenPasswordPage
