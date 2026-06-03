import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SeoHead from '@/src/components/common/SeoHead/SeoHead'
import PageLayout from '@/src/components/layouts/PageLayout'
import UrbanStudyPageContent from '@/src/components/page-contents/UrbanStudyPageContent'
import { AdminGroupsContextProvider } from '@/src/components/providers/AdminGroupsContextProvider'
import { GeneralContextProvider } from '@/src/components/providers/GeneralContextProvider'
import { GeneralQuery, UrbanStudyEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { NOT_FOUND_STATIC } from '@/src/utils/consts'

type PageProps = {
  general: GeneralQuery
  urbanStudy: UrbanStudyEntityFragment
}

type StaticParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps, StaticParams> = async ({
  locale,
  params,
}) => {
  const slug = params?.slug

  // eslint-disable-next-line no-console
  console.log(`Revalidating urban study ${locale === 'en' ? '/en' : ''}/uzemne-studie/${slug}`)

  if (!slug || !locale) {
    return NOT_FOUND_STATIC
  }

  const [{ urbanStudies }, general, translations] = await Promise.all([
    client.UrbanStudyBySlug({ slug }),
    client.General({ locale }),
    serverSideTranslations(locale),
  ])

  const urbanStudy = urbanStudies[0]
  if (!urbanStudy) {
    return NOT_FOUND_STATIC
  }

  return {
    props: {
      general,
      urbanStudy,
      ...translations,
    },
    revalidate: 10,
  }
}

const Page = ({ general, urbanStudy }: PageProps) => {
  const { title } = urbanStudy ?? {}

  return (
    <GeneralContextProvider general={general}>
      <AdminGroupsContextProvider adminGroups={[]}>
        <SeoHead title={title} />

        <PageLayout>
          <UrbanStudyPageContent urbanStudy={urbanStudy} />
        </PageLayout>
      </AdminGroupsContextProvider>
    </GeneralContextProvider>
  )
}

export default Page
