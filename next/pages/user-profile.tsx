import UserProfileView from '@bratislava/ui-bratislava/UserProfile/UserProfileView'
import { AsyncServerProps } from '@utils/types'
import { isProductionDeployment } from '@utils/utils'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AccountSectionHeader from '../components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import AccountPageLayout from '../components/layouts/AccountPageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import TestUserProfileLayout from '../components/layouts/TestUserProfileLayout'

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

const UserProfile = ({ page }: AsyncServerProps<typeof getServerSideProps>) => {
  const { t } = useTranslation('account')

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <AccountPageLayout>
        <AccountSectionHeader title={t('my_profile')} />
        <UserProfileView />
      </AccountPageLayout>
    </PageWrapper>
  )
}

export default UserProfile
