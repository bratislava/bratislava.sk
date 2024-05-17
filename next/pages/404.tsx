import { Typography } from '@bratislava/component-library'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useTranslations } from 'next-intl'

import Button from '@/components/forms/simple-components/Button'
import { useTitle } from '@/utils/useTitle'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [messages] = await Promise.all([import(`../messages/${locale}.json`)])

  return {
    props: {
      messages: messages.default,
    },
    revalidate: 10,
  }
}

const NotFoundPage = () => {
  const t = useTranslations()

  const title = useTitle('404')

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex h-screen w-screen px-7 py-10 md:pl-36 md:pr-32 xl:pl-80 xl:pr-66">
        <div className="flex w-full flex-col items-center md:flex-row-reverse md:justify-between">
          <img data-cy="404-image" src="/404_350px.png" alt="" />
          <div data-cy="404-left-side" className="flex flex-col items-center lg:items-start">
            {/* text-5xl font-extrabold does not work */}
            {/* FIXME Typography. Convert to use Typography */}
            <div className="pb-4 text-[48px] font-[800] lg:text-[64px]">404</div>
            <Typography type="p" size="p-large" className="max-w-xs pb-10 text-center lg:text-left">
              {t('sorryNoResultsFound')}
            </Typography>

            <Button variant="category-outline" href="/">
              {t('toTheMainPage')}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
