import { ChevronRightIcon } from '@assets/ui-icons'
import { HomepageSearchData } from '@backend/meili/fetchers/homepageSearchFetcher'
import { LoadingSpinner } from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

type HomePageSearchResultsProps = {
  searchValue: string
  data: HomepageSearchData | undefined
  isLoading: boolean
}

const HomePageSearchResults = ({ searchValue, data, isLoading }: HomePageSearchResultsProps) => {
  const t = useTranslations()

  return isLoading ? (
    <div className="flex flex-col items-center justify-center p-10">
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
          className="px-4 py-2 hover:bg-main-100"
        >
          <div className="flex items-center justify-between">
            <div>{title}</div>
            <ChevronRightIcon className="ml-4 shrink-0" />
          </div>
        </Link>
      ))}
      <Link
        href={`${t('searchLink')}?keyword=${searchValue}`}
        passHref
        className="px-4 py-2 font-semibold hover:bg-main-100 focus:bg-main-100"
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
