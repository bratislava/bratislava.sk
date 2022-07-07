import { Button } from '@bratislava/ui-bratislava/Button/Button'
import NoResultsFound from '@assets/images/ERROR404.svg'
import ChevronRight from '../assets/images/chevron-right.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'

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

  return (
    <div className="w-screen h-screen flex px-7 py-10 md:pl-36 md:pr-32 xl:pl-80 xl:pr-70">
      <div className="flex flex-col md:flex-row-reverse items-center md:justify-between w-full">
        <NoResultsFound />
        <div className="flex flex-col items-center lg:items-start">
          {/* text-5xl font-extrabold does not work */}
          <div className="text-[48px] lg:text-[64px] font-[800] pb-4">404</div>
          <div className="text-center lg:text-left lg:text-default max-w-xs pb-10">{t('sorryNoResultsFound')}</div>
          <Link href="/">
            <Button
              variant="transparent-black"
              className="text-sm md:text-default px-6 py-3"
              icon={<ChevronRight className="scale-75" />}
            >
              {t('toTheMainPage')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
