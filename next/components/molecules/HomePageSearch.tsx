import { getHomepageSearchSwrKey, homepageFetcher } from '@backend/meili/fetchers/homepageFetcher'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'
import { useDebounce, useOnClickOutside } from 'usehooks-ts'

import useGetSwrExtras from '../../utils/useGetSwrExtras'
import { AnimateHeight } from '../atoms/AnimateHeight'
import HomePageSearchField from './HomePageSearchField'
import HomePageSearchResults from './HomePageSearchResults'

const HomePageSearch = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation('common')

  const [isOpen, setOpen] = useState<boolean>(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearchValue = useDebounce(searchValue, 300)

  useEffect(() => {
    if (debouncedSearchValue !== searchValue) {
      setSearchValue(debouncedSearchValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue])

  const filters = { search: searchValue }

  const { data, error } = useSWR(
    getHomepageSearchSwrKey(filters, i18n.language),
    homepageFetcher(filters, i18n.language),
  )

  const { dataToDisplay, loadingAndNoDataToDisplay } = useGetSwrExtras({
    data,
    error,
  })

  const handleSearchPressed = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`${t('searchLink')}?keyword=${searchValue}`)
  }, [router, searchValue, t])

  return (
    <div ref={ref} className="relative">
      <div
        className={twMerge(
          `${isOpen ? 'md:w-[634px]' : 'md:w-[444px]'}`,
          'w-full transition-all duration-300',
        )}
      >
        <HomePageSearchField
          value={searchValue}
          setValue={setSearchValue}
          onSearchPressed={handleSearchPressed}
          onFocus={() => setOpen(true)}
        />
      </div>
      <AnimateHeight isVisible={isOpen} className="absolute w-full md:w-[634px] top-full z-40 mt-2">
        {searchValue ? (
          <div className="py-2 border-2 rounded-lg bg-white">
            <HomePageSearchResults
              data={dataToDisplay}
              isLoading={loadingAndNoDataToDisplay}
              searchValue={searchValue}
            />
          </div>
        ) : null}
      </AnimateHeight>
    </div>
  )
}

export default HomePageSearch
