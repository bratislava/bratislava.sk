import { ArrowRightIcon } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import Button from '@components/forms/simple-components/Button'
import { useTitle } from '@utils/useTitle'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}

const NotFoundPage = () => {
  const { Link } = useUIContext()
  const { t } = useTranslation('common')

  const title = useTitle('404')

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex h-screen w-screen px-7 py-10 md:pl-36 md:pr-32 xl:pl-80 xl:pr-66">
        <div className="flex w-full flex-col items-center md:flex-row-reverse md:justify-between">
          <img src="/404_350px.png" alt="" />
          <div className="flex flex-col items-center lg:items-start">
            {/* text-5xl font-extrabold does not work */}
            <div className="pb-4 text-[48px] font-[800] lg:text-[64px]">404</div>
            <div className="text-large-respo max-w-xs pb-10 text-center lg:text-left">
              {t('sorryNoResultsFound')}
            </div>

            <Button variant="category-outline" href="/" endIcon={<ArrowRightIcon />}>
              {t('toTheMainPage')}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
