import UserProfileView from '@bratislava/ui-bratislava/UserProfileView/UserProfileView'
import { AsyncServerProps } from '@utils/types'
import useAccount from '@utils/useAccount'
import { isProductionDeployment } from '@utils/utils'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import GeneralLayout from '../components/layouts/GeneralLayout'
import PageWrapper from '../components/layouts/PageWrapper'

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
  const { user } = useAccount()
  console.log('USER', user)

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations}>
      <GeneralLayout title={t('my_profile')}>
        <h1 className="text-h1 xs:text-h1-lg pb pl-4 xs:pl-28 pb-6 pt-14 xs:pt-6">
          {t('my_profile')}
        </h1>
        <UserProfileView />
      </GeneralLayout>
    </PageWrapper>
  )
}

export default UserProfile
