import { ChevronRightIcon } from '@assets/ui-icons'
import { HomepageSearchData } from '@backend/meili/fetchers/homepageSearchFetcher'
import { LoadingSpinner } from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { useEventListener } from 'usehooks-ts'

type HomePageSearchResultsProps = {
  searchValue: string
  data: HomepageSearchData | undefined
  isLoading: boolean
}

const HomePageSearchResults = ({ searchValue, data, isLoading }: HomePageSearchResultsProps) => {
  const t = useTranslations()
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
    <div className="flex flex-col">
      {data.hits.map(({ title, link }, index) => (
        <Link
          href={link}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          passHref
          className="px-4 py-2 hover:bg-main-100 focus:bg-main-100"
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
        href={`${t('searchLink')}?keyword=${searchValue}`}
        passHref
        className="px-4 py-2 font-semibold hover:bg-main-100 focus:bg-main-100"
        ref={(el) => {
          inputRef.current[data.hits.length] = el
        }}
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
