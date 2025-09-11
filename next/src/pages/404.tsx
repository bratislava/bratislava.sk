import { Typography } from '@bratislava/component-library'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Button from '@/src/components/common/Button/Button'
import SeoHead from '@/src/components/common/SeoHead/SeoHead'
import PageLayout from '@/src/components/layouts/PageLayout'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { GeneralQuery } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'

type PageProps = {
  general: GeneralQuery
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [general, translations] = await Promise.all([
    client.General({ locale }),
    serverSideTranslations(locale ?? 'sk'),
  ])

  return {
    props: {
      general,
      ...translations,
    },
    revalidate: 10,
  }
}

const NotFoundPage = ({ general }: PageProps) => {
  const { t } = useTranslation()

  const router = useRouter()
  const title = t('NotFound.pageTitle')

  return (
    <GeneralContextProvider general={general}>
      <SeoHead title={title} />

      <PageLayout>
        <SectionContainer>
          <div className="flex flex-col items-center gap-8 py-14 max-md:gap-0 max-md:pt-0 md:flex-row-reverse md:justify-center">
            <img data-cy="404-image" src="/404_350px.png" alt="" />
            <div data-cy="404-left-side" className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 text-center md:text-left">
                <Typography variant="h1">{t('NotFound.messageTitle')}</Typography>
                <Typography variant="p-large">{t('NotFound.sorryNoResultsFound')}</Typography>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <Button variant="solid" hasLinkIcon={false} fullWidthMobile href="/">
                  {t('NotFound.toTheMainPage')}
                </Button>
                <Button variant="outline" fullWidthMobile onPress={() => router.back()}>
                  {t('NotFound.toThePreviousPage')}
                </Button>
              </div>
            </div>
          </div>
        </SectionContainer>
      </PageLayout>
    </GeneralContextProvider>
  )
}

export default NotFoundPage
