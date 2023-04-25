import {
  getHomepageSearchSwrKey,
  homepageSearchFetcher,
} from '@backend/meili/fetchers/homepageSearchFetcher'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'
import { useDebounce, useOnClickOutside } from 'usehooks-ts'

import useGetSwrExtras from '../../utils/useGetSwrExtras'
import { AnimateHeight } from '../atoms/AnimateHeight'
import HomePageSearchField from './HomePageSearchField'
import HomePageSearchResults from './HomePageSearchResults'

interface HomePageSearchProps {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const HomePageSearch = ({ isOpen, setOpen }: HomePageSearchProps) => {
  const router = useRouter()
  const t = useTranslations()
  const locale = useLocale()

  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  const [input, setInput] = useState<string>('')
  const debouncedInput = useDebounce(input, 300)
  const [searchValue, setSearchValue] = useState<string>('')

  /* Use of separate searchValue instead of debouncedInput is to make it clear, what the actual search value is,
   * and to keep it consistent with more complex search filters
   */
  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  const filters = { search: searchValue }

  const { data, error } = useSWR(
    getHomepageSearchSwrKey(filters, locale),
    homepageSearchFetcher(filters, locale),
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
          value={input}
          setValue={setInput}
          onSearchPressed={handleSearchPressed}
          onFocus={() => setOpen(true)}
        />
      </div>
      <AnimateHeight isVisible={isOpen} className="absolute top-full z-40 mt-2 w-full md:w-[634px]">
        {searchValue ? (
          <div className="rounded-lg border-2 bg-white py-2">
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
