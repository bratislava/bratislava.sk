import { ChevronRightRounded } from '@assets/images'
import { HomepageSearchData } from '@backend/meili/fetchers/homepageFetcher'
import { LoadingSpinner } from '@bratislava/ui-bratislava'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

type HomePageSearchResultsProps = {
  searchValue: string
  data: HomepageSearchData | undefined
  isLoading: boolean
}

const HomePageSearchResults = ({ searchValue, data, isLoading }: HomePageSearchResultsProps) => {
  const { t } = useTranslation('common')

  return isLoading ? (
    <div className="text-primary flex flex-col items-center justify-center p-10">
      <LoadingSpinner size="medium" />
    </div>
  ) : data && data.hits?.length > 0 ? (
    <div className="flex flex-col">
      {data.hits.map(({ title, link }, index) => (
        <Link
          href={link}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          passHref
          className="hover:bg-main-100 px-4 py-2"
        >
          <div className="flex justify-between items-center">
            <div>{title}</div>
            <ChevronRightRounded className="scale-[0.9] ml-4 shrink-0" />
          </div>
        </Link>
      ))}
      <Link
        href={`${t('searchLink')}?keyword=${searchValue}`}
        passHref
        className="focus:bg-main-100 hover:bg-main-100 font-semibold px-4 py-2"
      >
        {t('allResults')}
      </Link>
    </div>
  ) : (
    <div className="flex flex-col">
      <div className="px-4 py-2">{t('sorryNoResultsFound')}</div>
    </div>
  )
}

export default HomePageSearchResults
