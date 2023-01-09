import AccountContainer from '@bratislava/ui-bratislava/AccountContainer/AccountContainer'
import ForgotPasswordForm from '@bratislava/ui-bratislava/ForgottenPasswordForm/ForgottenPasswordForm'
import { AsyncServerProps } from '@utils/types'
import AccountPageLayout from 'components/layouts/AccountPageLayout'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <AccountPageLayout>
        <AccountContainer>
          <ForgotPasswordForm />
        </AccountContainer>
      </AccountPageLayout>
    </PageWrapper>
  )
}

export default LoginPage
