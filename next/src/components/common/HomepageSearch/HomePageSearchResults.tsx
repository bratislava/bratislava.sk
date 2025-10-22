import Link from 'next/link'
import { useRef } from 'react'
import { ChevronRightIcon } from 'src/assets/icons'
import { useEventListener } from 'usehooks-ts'

import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import { HomepageSearchData } from '@/src/services/meili/fetchers/homepageSearchFetcher'
import { useTranslation } from '@/src/utils/useTranslation'

type HomePageSearchResultsProps = {
  searchValue: string
  data: HomepageSearchData | undefined
  isLoading: boolean
}

 
const HomePageSearchResults = ({ searchValue, data, isLoading }: HomePageSearchResultsProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
      return
    }
    // eslint-disable-next-line xss/no-mixed-html
    const index = inputRef.current.indexOf(e.target as HTMLAnchorElement)
    if (index === -1) {
      return
    }
    if (e.key === 'ArrowDown' && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus()
    }
    if (e.key === 'ArrowUp' && index > 0) {
      inputRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowUp' && index === 0) {
      document.querySelector<HTMLInputElement>('#homepage-search-field')?.focus()
    }
    e.preventDefault()
  })

  return isLoading ? (
    <div className="flex flex-col items-center justify-center p-10">
      <LoadingSpinner size="medium" />
    </div>
  ) : data && data.hits?.length > 0 ? (
    <div className="flex flex-col" data-cy="homepage-search-results">
      {data.hits.map(({ title, link }, index) => (
        <Link
          href={link}
           
          key={index}
          passHref
          className="base-focus-ring px-4 py-2 ring-inset hover:bg-grey-100 focus:bg-grey-100"
          ref={(el) => {
            inputRef.current[index] = el
          }}
          id={index === 0 ? 'homepage-first-search-result' : undefined}
        >
          <div className="flex items-center justify-between">
            <div>{title}</div>
            <ChevronRightIcon className="ml-4 shrink-0" />
          </div>
        </Link>
      ))}
      <Link
        href={`${t('links.searchLink')}?keyword=${searchValue}`}
        passHref
        className="base-focus-ring px-4 py-2 font-semibold ring-inset hover:bg-grey-100 focus:bg-grey-100"
        ref={(el) => {
          inputRef.current[data.hits.length] = el
        }}
        data-cy="homepage-search-all-results"
      >
        {t('HomepageSearchResults.allResults')}
      </Link>
    </div>
  ) : (
    <div className="flex flex-col" data-cy="homepage-search-no-results">
      <div className="px-4 py-2">{t('HomepageSearchResults.sorryNoResultsFound')}</div>
    </div>
  )
}

export default HomePageSearchResults
