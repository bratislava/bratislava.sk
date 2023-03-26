import NoResultsFound from '@assets/images/404.png'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Button } from '@bratislava/ui-bratislava/Button/Button'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import ChevronRight from '../assets/images/chevron-right.svg'

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
    <div className="xl:pr-66 flex h-screen w-screen px-7 py-10 md:pl-36 md:pr-32 xl:pl-80">
      <div className="flex w-full flex-col items-center md:flex-row-reverse md:justify-between">
        <Image src={NoResultsFound} alt="" width={216} className="mx-[67px]" />
        <div className="flex flex-col items-center lg:items-start">
          {/* text-5xl font-extrabold does not work */}
          <div className="pb-4 text-[48px] font-[800] lg:text-[64px]">404</div>
          <div className="text-p1 max-w-xs pb-10 text-center lg:text-left">
            {t('sorryNoResultsFound')}
          </div>
          <Link href="/">
            <Button
              variant="transparent-black"
              className="text-p1 px-6 py-3"
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
