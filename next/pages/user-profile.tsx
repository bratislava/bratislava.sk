import UserProfileView from '@bratislava/ui-bratislava/UserProfile/UserProfileView'
import { AsyncServerProps } from '@utils/types'
import useAccount from '@utils/useAccount'
import { isProductionDeployment } from '@utils/utils'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
      <TestUserProfileLayout title={t('my_profile')}>
        <h1 className="text-h1 xs:text-h1-lg pb pl-4 xs:pl-28 pb-6 pt-14 xs:pt-6">
          {t('my_profile')}
        </h1>
        <UserProfileView />
      </TestUserProfileLayout>
    </PageWrapper>
  )
}

export default UserProfile
