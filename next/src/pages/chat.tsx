import { Typography } from '@bratislava/component-library'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

import SeoHead from '@/src/components/common/SeoHead/SeoHead'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import ChatSection from '@/src/components/sections/ChatSection/ChatSection'
import { NOT_FOUND_STATIC } from '@/src/utils/consts'
import { useTranslation } from '@/src/utils/useTranslation'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return NOT_FOUND_STATIC
  }

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
    revalidate: 10,
  }
}

/**
 * The chat is intentionally rendered without PageLayout - no navbar, no footer, so it can be embedded later, e.g. in
 * the planned floating chat button.
 */
const Page = () => {
  const { t } = useTranslation()

  return (
    <>
      <SeoHead title={t('ChatPage.title')} />

      <main className="flex h-dvh flex-col">
        <SectionContainer className="shrink-0 border-b py-4">
          <Typography variant="h4" as="h1">
            {t('ChatPage.title')}
          </Typography>
        </SectionContainer>

        <ChatSection />
      </main>
    </>
  )
}

export default Page
